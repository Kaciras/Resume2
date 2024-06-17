import ReactMarkdown from "react-markdown";

export default function MarkdownView({ children }) {
	return <div className="markdown"><ReactMarkdown>{children}</ReactMarkdown></div>
}
