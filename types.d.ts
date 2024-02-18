import { Message } from "ai";
import { Infer } from "convex/values";
import {
  FieldErrors,
  UseFormRegister,
  UseFormReset,
  UseFormSetValue,
  UseFormTrigger,
} from "react-hook-form";
import { z } from "zod";

import { Github, Response } from "./convex/schema";
import { chatSchema } from "./schema/chat_schema";
import { quizSchema } from "./schema/quiz_schema";
import { Dispatch } from "react";

type quizSchema = z.infer<typeof quizSchema>;
type chatSchema = z.infer<typeof chatSchema>;

export type UserAnswers = {
  [key: string]: string;
};

export type FormatType = "mcq" | "name" | "true_false";

export type SelectedOptions = {
  key: number;
  value: string;
}[];

export type ResponseData = Infer<typeof Response>;
export type MessageData = Infer<typeof Message>;
export type GithubFilesData = Infer<typeof Github> & {
  _id: Id<"github">;
  chatId: Id<"chatbook">;
  _creationTime: number;
};

export interface GameData {
  _id: Id<"quiz">;
  _creationTime: number;
  content: string;
  format: "mcq" | "name" | "true_false";
  kind: "topic" | "paragraph" | "document";
  questionNumber: number;
  response?: ResponseData | string;
  result?: {
    correctAnswer: number;
    score: number;
  };
  title?: string;
  userId: Id<"users">;
}

interface QuizData {
  yourAnswer?: string | undefined;
  options?: string[] | undefined;
  question: string;
  answer: string;
}

export interface CreateUserPrompt {
  format: FormatType;
  questionNumber: number;
  content: string;
  kind: string;
}

export interface ChatData {
  _id: Id<"chatbook">;
  _creationTime: number;
  url: string;
  type?: "doc" | "code" | "video";
  title?: string;
  chat?: MessageType[];
  userId: Id<"users">;
  embeddingId?: ID<"chatEmbeddings">[];
}

export interface MessageType {
  tool_call_id?: string;
  ui?: any;
  url?: string;
  content: string;
  id: string;
  role: "function" | "system" | "user" | "assistant" | "data" | "tool";
}

export interface DocumentType<K extends string> {
  kind: K;
  format: K extends "quiz"
    ? "topic" | "paragraph" | "document"
    : "link" | "document";
  isSubmitted: boolean;
  register: K extends "quiz"
    ? UseFormRegister<quizSchema>
    : UseFormRegister<chatSchema>;
  errors: K extends "quiz" ? FieldErrors<quizSchema> : FieldErrors<chatSchema>;
}

export interface DropDownType<K extends string> {
  kind: K;
  value: string;
  lists: string[];
  reset?: K extends "quiz"
    ? UseFormReset<quizSchema>
    : UseFormReset<chatSchema>;
  setValue?: K extends "quiz"
    ? UseFormSetValue<quizSchema>
    : UseFormSetValue<chatSchema>;
  trigger?: K extends "quiz"
    ? UseFormTrigger<quizSchema>
    : UseFormTrigger<chatSchema>;
  setError: React.Dispatch<React.SetStateAction<string>>;
}
export interface UrlType<K extends string> {
  kind: K;
  repo: K extends "quiz" ? null : "public" | "private";
  format: K extends "quiz"
    ? "topic" | "paragraph" | "document"
    : "youtube" | "github" | "document";
  isSubmitted: boolean;
  setValue?: K extends "quiz" ? null : UseFormSetValue<chatSchema>;
  register: K extends "quiz"
    ? UseFormRegister<quizSchema>
    : UseFormRegister<chatSchema>;
  errors: K extends "quiz" ? FieldErrors<quizSchema> : FieldErrors<chatSchema>;
}

export interface AddEmbedding {
  chatId: Id<"chatbook">;
  content: string;
  source: string;
  embedding: number[];
  title: string;
  type: "code" | "video" | "doc";
}
export interface DashboardType<K extends string> {
  type: K;
  data: K extends "quiz" ? GameData[] : ChatData[];
}

export interface Document {
  pageContent: string;
  metadata: string;
}

export interface Chunk {
  content: string;
  source: string;
}

export interface FilePath {
  id: string;
  path: string;
  content: string;
}

export type TreeStructure = {
  [key: string]: TreeStructure | {}; // Recursive type definition
};
