import type { QuizBadge } from "types/quizzes";

export function formatBadgeName(badge: QuizBadge): string {
  switch (badge) {
    case "c":
      return "C";
    case "cpp":
      return "C++";
    case "csharp":
      return "C#";
    case "css":
      return "CSS";
    case "driving-license":
      return "Driving License";
    case "html":
      return "HTML";
    case "java":
      return "Java";
    case "php":
      return "PHP";
    case "rust":
      return "Rust";
    case "typescript":
      return "Typescript";
    case "javascript":
      return "Javascript";
  }
}

export function formatBadgeColor(badge: QuizBadge): string {
  switch (badge) {
    case "c":
      return "yellow";
    case "cpp":
      return "yellow";
    case "csharp":
      return "yellow";
    case "css":
      return "yellow";
    case "driving-license":
      return "yellow";
    case "html":
      return "yellow";
    case "java":
      return "yellow";
    case "php":
      return "yellow";
    case "rust":
      return "yellow";
    case "typescript":
      return "blue";
    case "javascript":
      return "yellow";
  }
}
