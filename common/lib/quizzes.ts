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
      return "light-blue-10";
    case "csharp":
      return "purple";
    case "css":
      return "light-blue-7";
    case "driving-license":
      return "red";
    case "html":
      return "deep-orange-8";
    case "java":
      return "amber-10";
    case "php":
      return "light-blue-6";
    case "rust":
      return "grey-14";
    case "typescript":
      return "blue";
    case "javascript":
      return "amber-7";
  }
}
