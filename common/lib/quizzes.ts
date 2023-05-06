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
  }
}
