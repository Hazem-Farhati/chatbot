import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { coldarkDark } from "react-syntax-highlighter/dist/esm/styles/prism";

import {
	detectCodeSnippet,
	isCodeBlock,
} from "../../helpers/extract-code-snippet";

import styles from "./ChatItem.module.css";

import botIcon from "../../assets/logos/bot.png";
import { useAuth } from "../../context/AuthContext";

type Props = {
	content: string;
	role: string;
};

const ChatItem = ({
  content,
  role,
}: Props) => {

	const messageBlocks = detectCodeSnippet(content);
	const auth = useAuth();
	console.log("auth",auth);

	const botMsg = (
		<div className={`${styles.parent} ${styles.bot_parent}`}>
			<div className={`${styles.avatar}`}>
				<img src={botIcon} alt='chat bot icon'></img>
			</div>
			<div className={styles.msg}>
			<p>{content}</p>

			</div>
		</div>
	);

	const userMsg = (
		<div className={`${styles.parent} ${styles.user_parent}`}>
			<div className={`${styles.avatar} ${styles.user_avatar}`}>
				{auth?.user?.name[0]}
					{auth?.user?.name[1]}
		
			</div>
			<div className={styles.msg}>
				<p>{content}</p>
			</div>
		</div>
	);

	return (
		<>
			{role === "model" && botMsg}
			{role === "user" && userMsg}
		</>
	);
};

export default ChatItem;
