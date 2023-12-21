import {
  int,
  timestamp,
  mysqlTable,
  primaryKey,
  varchar,
  serial,
  text
} from 'drizzle-orm/mysql-core';
import type { AdapterAccount } from "@auth/core/adapters";

// NextAuth.js required tables
export const users = mysqlTable("user", {
  id: varchar("id", { length: 255 }).notNull().primaryKey(),
  name: varchar("name", { length: 255 }),
  email: varchar("email", { length: 255 }).notNull(),
   emailVerified: timestamp("emailVerified", { mode: "date", fsp: 3 }).defaultNow(),
  image: varchar("image", { length: 255 }),
 })
 
 export const accounts = mysqlTable(
  "account",
   {
    userId: varchar("userId", { length: 255 })
       .notNull()
       .references(() => users.id, { onDelete: "cascade" }),
    type: varchar("type", { length: 255 }).$type<AdapterAccount["type"]>().notNull(),
     provider: varchar("provider", { length: 255 }).notNull(),
    providerAccountId: varchar("providerAccountId", { length: 255 }).notNull(),
    refresh_token: varchar("refresh_token", { length: 255 }),
    access_token: varchar("access_token", { length: 255 }),
    expires_at: int("expires_at"),
   token_type: varchar("token_type", { length: 255 }),
   scope: varchar("scope", { length: 255 }),
   id_token: varchar("id_token", { length: 2048 }),
   session_state: varchar("session_state", { length: 255 }),
 },
 (account) => ({
   compoundKey: primaryKey(account.provider, account.providerAccountId),
 })
 )
 
 export const sessions = mysqlTable("session", {
  sessionToken: varchar("sessionToken", { length: 255 }).notNull().primaryKey(),
  userId: varchar("userId", { length: 255 })
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  expires: timestamp("expires", { mode: "date" }).notNull(),
 })
 
 export const verificationTokens = mysqlTable(
 "verificationToken",
 {
   identifier: varchar("identifier", { length: 255 }).notNull(),
   token: varchar("token", { length: 255 }).notNull(),
   expires: timestamp("expires", { mode: "date" }).notNull(),
 },
 (vt) => ({
   compoundKey: primaryKey(vt.identifier, vt.token),
 })
 )

// Custom tables

// UserDetails table
export const userDetails = mysqlTable('user_details', {
  id: varchar('id', { length: 255 }).primaryKey().references(() => users.id),
  name: varchar('name', { length: 255 }),
  email: varchar('email', { length: 255 }),
  bio: text('bio')
});

// Updated Songs table without foreign key constraints
export const songs = mysqlTable('songs', {
  id: serial("id").primaryKey(),
  r2Id: varchar('r2Id', { length: 255 }),
  uploaderUserId: varchar('uploaderUserId', { length: 255 }), // No foreign key reference
  genre: varchar('genre', { length: 255 }),
  instruments: varchar('instruments', { length: 255 }),
  description: text('description'),
  lyrics: text('lyrics')
});

// Updated Song feedback table without foreign key constraints
export const songFeedback = mysqlTable('songFeedback', {
  id: serial("id").primaryKey(),
  reviewerUserId: varchar('reviewerUserId', { length: 255 }), // No foreign key reference
  uploaderUserId: varchar('uploaderUserId', { length: 255 }), // No foreign key reference
  songId: varchar('songId', { length: 255 }), // No foreign key reference
  productionFeedback: text('productionFeedback'),
  instrumentationFeedback: text('instrumentationFeedback'),
  songwritingFeedback: text('songwritingFeedback'),
  vocalsFeedback: text('vocalsFeedback'),
  otherFeedback: text('otherFeedback')
});


export default {
  users,
  accounts,
  sessions,
  verificationTokens,
  songFeedback,
  songs,
  userDetails
};
