"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Layers,
  ChevronLeft,
  Plus,
  ExternalLink,
  Trash2,
  X,
  Image as ImageIcon,
} from "lucide-react";

interface NftItem {
  id: string;
  name: string;
  collectionName: string | null;
  imageUrl: string;
  contractAddress: string | null;
  tokenId: string | null;
  linkUrl: string | null;
  displayOrder: number;
  createdAt: string;
}

export default function CollectionPage() {
  const [nfts, setNfts] = useState<NftItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [form, setForm] = useState({
    name: "",
    imageUrl: "",
    collectionName: "",
    contractAddress: "",
    tokenId: "",
    linkUrl: "",
  });
  const [formError, setFormError] = useState("");

  const fetchNfts = () => {
    const token = localStorage.getItem("token");
    if (!token) return;
    setLoading(true);
    fetch("/api/user/nfts", { headers: { Authorization: `Bearer ${token}` } })
      .then((res) => (res.ok ? res.json() : Promise.reject(res)))
      .then((json) => setNfts(json.data?.nfts ?? []))
      .catch(() => setNfts([]))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchNfts();
  }, []);

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError("");
    if (!form.name.trim() || !form.imageUrl.trim()) {
      setFormError("Name and Image URL are required.");
      return;
    }
    const token = localStorage.getItem("token");
    if (!token) return;
    setSubmitting(true);
    try {
      const res = await fetch("/api/user/nfts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: form.name.trim(),
          imageUrl: form.imageUrl.trim(),
          collectionName: form.collectionName.trim() || undefined,
          contractAddress: form.contractAddress.trim() || undefined,
          tokenId: form.tokenId.trim() || undefined,
          linkUrl: form.linkUrl.trim() || undefined,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setFormError(data?.error ?? "Failed to add NFT");
        return;
      }
      setForm({ name: "", imageUrl: "", collectionName: "", contractAddress: "", tokenId: "", linkUrl: "" });
      setModalOpen(false);
      fetchNfts();
    } catch {
      setFormError("Network error");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    const token = localStorage.getItem("token");
    if (!token) return;
    setDeletingId(id);
    try {
      const res = await fetch(`/api/user/nfts/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) fetchNfts();
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Link
            href="/dashboard"
            className="p-2 rounded-lg text-surface-400 hover:text-white hover:bg-surface-800/50 transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-white">My Collection</h1>
            <p className="text-surface-400 mt-0.5">Showcase your NFTs</p>
          </div>
        </div>
        <button
          onClick={() => setModalOpen(true)}
          className="btn-primary inline-flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Add NFT
        </button>
      </div>

      {loading ? (
        <div className="py-16 flex justify-center">
          <div className="w-10 h-10 border-2 border-brand-500/30 border-t-brand-400 rounded-full animate-spin" />
        </div>
      ) : nfts.length === 0 ? (
        <div className="card p-12 text-center">
          <div className="inline-flex p-4 rounded-2xl bg-brand-500/10 border border-brand-500/20 mb-4">
            <Layers className="w-12 h-12 text-brand-400" />
          </div>
          <h2 className="text-lg font-semibold text-white mb-2">No NFTs yet</h2>
          <p className="text-surface-400 mb-6 max-w-sm mx-auto">
            Add NFTs to your collection to showcase them on your profile. You can add image, name, collection, and optional links.
          </p>
          <button onClick={() => setModalOpen(true)} className="btn-primary inline-flex items-center gap-2">
            <Plus className="w-4 h-4" />
            Add your first NFT
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {nfts.map((nft) => (
            <div
              key={nft.id}
              className="card overflow-hidden group hover:border-brand-500/30 transition-colors"
            >
              <div className="aspect-square bg-surface-800/50 relative">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={nft.imageUrl}
                  alt={nft.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 200'%3E%3Crect fill='%23374151' width='200' height='200'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' fill='%239ca3af' font-size='14'%3ENo image%3C/text%3E%3C/svg%3E";
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-3">
                  <div className="flex items-center gap-2">
                    {nft.linkUrl ? (
                      <a
                        href={nft.linkUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white"
                        title="View"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    ) : null}
                    <button
                      onClick={() => handleDelete(nft.id)}
                      disabled={deletingId === nft.id}
                      className="p-1.5 rounded-lg bg-red-500/20 hover:bg-red-500/40 text-red-300 disabled:opacity-50"
                      title="Remove"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
              <div className="p-3">
                <p className="font-medium text-white truncate" title={nft.name}>{nft.name}</p>
                {nft.collectionName && (
                  <p className="text-xs text-surface-400 truncate" title={nft.collectionName}>
                    {nft.collectionName}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add NFT modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setModalOpen(false)} />
          <div className="relative card w-full max-w-md max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-white">Add NFT</h2>
              <button
                onClick={() => setModalOpen(false)}
                className="p-2 rounded-lg text-surface-400 hover:text-white hover:bg-surface-800/50"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleAdd} className="space-y-4">
              {formError && (
                <p className="text-sm text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2">
                  {formError}
                </p>
              )}
              <div>
                <label className="block text-sm font-medium text-surface-300 mb-1">Name *</label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                  placeholder="e.g. Soul #42"
                  className="input-field w-full"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-surface-300 mb-1">Image URL *</label>
                <div className="relative">
                  <ImageIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-surface-500" />
                  <input
                    type="url"
                    value={form.imageUrl}
                    onChange={(e) => setForm((f) => ({ ...f, imageUrl: e.target.value }))}
                    placeholder="https://..."
                    className="input-field w-full pl-9"
                    required
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-surface-300 mb-1">Collection name</label>
                <input
                  type="text"
                  value={form.collectionName}
                  onChange={(e) => setForm((f) => ({ ...f, collectionName: e.target.value }))}
                  placeholder="e.g. Soul Gaming Genesis"
                  className="input-field w-full"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-surface-300 mb-1">Contract address</label>
                <input
                  type="text"
                  value={form.contractAddress}
                  onChange={(e) => setForm((f) => ({ ...f, contractAddress: e.target.value }))}
                  placeholder="0x..."
                  className="input-field w-full font-mono text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-surface-300 mb-1">Token ID</label>
                <input
                  type="text"
                  value={form.tokenId}
                  onChange={(e) => setForm((f) => ({ ...f, tokenId: e.target.value }))}
                  placeholder="Optional"
                  className="input-field w-full"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-surface-300 mb-1">Link (OpenSea, etc.)</label>
                <input
                  type="url"
                  value={form.linkUrl}
                  onChange={(e) => setForm((f) => ({ ...f, linkUrl: e.target.value }))}
                  placeholder="https://..."
                  className="input-field w-full"
                />
              </div>
              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="btn-secondary flex-1"
                >
                  Cancel
                </button>
                <button type="submit" disabled={submitting} className="btn-primary flex-1 inline-flex items-center justify-center gap-2">
                  {submitting ? (
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <Plus className="w-4 h-4" />
                  )}
                  Add
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
