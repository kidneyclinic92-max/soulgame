-- Soul Gaming - Azure SQL Database schema
-- Run this script in your Azure SQL database to create tables.

-- Users
IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'users')
BEGIN
  CREATE TABLE users (
    id NVARCHAR(50) PRIMARY KEY,
    username NVARCHAR(50) NOT NULL UNIQUE,
    email NVARCHAR(255) NOT NULL UNIQUE,
    password NVARCHAR(255) NOT NULL,
    avatar NVARCHAR(500) NULL,
    bio NVARCHAR(500) NULL,
    role NVARCHAR(20) NOT NULL DEFAULT 'user',
    totalPoints INT NOT NULL DEFAULT 0,
    totalEarnings FLOAT NOT NULL DEFAULT 0,
    createdAt DATETIME2 NOT NULL DEFAULT GETUTCDATE(),
    updatedAt DATETIME2 NOT NULL DEFAULT GETUTCDATE()
  );
END
GO

-- Games
IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'games')
BEGIN
  CREATE TABLE games (
    id NVARCHAR(50) PRIMARY KEY,
    name NVARCHAR(100) NOT NULL UNIQUE,
    slug NVARCHAR(100) NOT NULL UNIQUE,
    genre NVARCHAR(50) NOT NULL,
    description NVARCHAR(MAX) NULL,
    image NVARCHAR(500) NULL,
    isActive BIT NOT NULL DEFAULT 1,
    playToEarn BIT NOT NULL DEFAULT 0,
    pointsPerWin INT NOT NULL DEFAULT 10,
    pointsPerMatch INT NOT NULL DEFAULT 2,
    createdAt DATETIME2 NOT NULL DEFAULT GETUTCDATE(),
    updatedAt DATETIME2 NOT NULL DEFAULT GETUTCDATE()
  );
END
GO

-- User game stats
IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'user_game_stats')
BEGIN
  CREATE TABLE user_game_stats (
    id NVARCHAR(50) PRIMARY KEY,
    userId NVARCHAR(50) NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    gameId NVARCHAR(50) NOT NULL REFERENCES games(id) ON DELETE CASCADE,
    wins INT NOT NULL DEFAULT 0,
    losses INT NOT NULL DEFAULT 0,
    draws INT NOT NULL DEFAULT 0,
    rankPoints INT NOT NULL DEFAULT 0,
    hoursPlayed FLOAT NOT NULL DEFAULT 0,
    UNIQUE(userId, gameId)
  );
END
GO

-- Reward transactions
IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'reward_transactions')
BEGIN
  CREATE TABLE reward_transactions (
    id NVARCHAR(50) PRIMARY KEY,
    userId NVARCHAR(50) NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    amount INT NOT NULL,
    type NVARCHAR(50) NOT NULL,
    description NVARCHAR(500) NULL,
    gameId NVARCHAR(50) NULL REFERENCES games(id),
    createdAt DATETIME2 NOT NULL DEFAULT GETUTCDATE()
  );
END
GO

-- Tournaments
IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'tournaments')
BEGIN
  CREATE TABLE tournaments (
    id NVARCHAR(50) PRIMARY KEY,
    name NVARCHAR(200) NOT NULL,
    description NVARCHAR(MAX) NULL,
    gameId NVARCHAR(50) NOT NULL REFERENCES games(id),
    maxParticipants INT NOT NULL,
    prizePool NVARCHAR(50) NOT NULL DEFAULT '0',
    status NVARCHAR(30) NOT NULL DEFAULT 'open',
    startDate DATETIME2 NOT NULL,
    endDate DATETIME2 NULL,
    createdById NVARCHAR(50) NOT NULL REFERENCES users(id),
    createdAt DATETIME2 NOT NULL DEFAULT GETUTCDATE(),
    updatedAt DATETIME2 NOT NULL DEFAULT GETUTCDATE()
  );
END
GO

-- Tournament participants
IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'tournament_participants')
BEGIN
  CREATE TABLE tournament_participants (
    id NVARCHAR(50) PRIMARY KEY,
    tournamentId NVARCHAR(50) NOT NULL REFERENCES tournaments(id) ON DELETE CASCADE,
    userId NVARCHAR(50) NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    joinedAt DATETIME2 NOT NULL DEFAULT GETUTCDATE(),
    placement INT NULL,
    UNIQUE(tournamentId, userId)
  );
END
GO

-- Posts (community)
IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'posts')
BEGIN
  CREATE TABLE posts (
    id NVARCHAR(50) PRIMARY KEY,
    title NVARCHAR(300) NOT NULL,
    content NVARCHAR(MAX) NOT NULL,
    authorId NVARCHAR(50) NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    category NVARCHAR(50) NOT NULL DEFAULT 'general',
    likes INT NOT NULL DEFAULT 0,
    createdAt DATETIME2 NOT NULL DEFAULT GETUTCDATE(),
    updatedAt DATETIME2 NOT NULL DEFAULT GETUTCDATE()
  );
END
GO

-- User NFT collection (showcase)
IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'user_nfts')
BEGIN
  CREATE TABLE user_nfts (
    id NVARCHAR(50) PRIMARY KEY,
    userId NVARCHAR(50) NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    name NVARCHAR(200) NOT NULL,
    collectionName NVARCHAR(200) NULL,
    imageUrl NVARCHAR(1000) NOT NULL,
    contractAddress NVARCHAR(100) NULL,
    tokenId NVARCHAR(100) NULL,
    linkUrl NVARCHAR(1000) NULL,
    displayOrder INT NOT NULL DEFAULT 0,
    createdAt DATETIME2 NOT NULL DEFAULT GETUTCDATE()
  );
END
GO

-- Comments (authorId NO ACTION to avoid multiple cascade paths: users->comments and users->posts->comments)
IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'comments')
BEGIN
  CREATE TABLE comments (
    id NVARCHAR(50) PRIMARY KEY,
    content NVARCHAR(MAX) NOT NULL,
    postId NVARCHAR(50) NOT NULL REFERENCES posts(id) ON DELETE CASCADE,
    authorId NVARCHAR(50) NOT NULL REFERENCES users(id) ON DELETE NO ACTION,
    likes INT NOT NULL DEFAULT 0,
    createdAt DATETIME2 NOT NULL DEFAULT GETUTCDATE(),
    updatedAt DATETIME2 NOT NULL DEFAULT GETUTCDATE()
  );
END
GO
