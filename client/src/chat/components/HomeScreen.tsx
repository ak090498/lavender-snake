import styled from "@emotion/styled";
import { css } from "@emotion/react";
import { FC } from "react";
import { ThreadSummary } from "../../../../shared/chatTypes";
import { useContacts, useThreads } from "../ChatContext";
import { MdAccountCircle } from "react-icons/md";
import { chatColors } from "@/chatColors";

const homeScreenCSS = {
	homeScreenContainer: css({
		minWidth: "30%",
		display: "flex",
		flexDirection: "column",
		background: chatColors.secondaryBG,
	}),
	header: css({
		minHeight: "4rem",
		display: "flex",
		alignItems: "center",
		justifyContent: "left",
		padding: "0 1rem",
	}),
	brandName: css({
		fontSize: "1.5rem",
		fontWeight: "700",
		background:
			"linear-gradient(90deg, rgba(140, 81, 165, 1) 0%,rgba(203, 94, 152, 1) 100%)",
		WebkitBackgroundClip: "text",
		WebkitTextFillColor: "transparent",
	}),
	unreadChatCount: css({
		marginLeft: "0.7rem",
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
		fontSize: "0.85rem",
		width: "1.6rem",
		height: "1.5rem",
		background: chatColors.accent,
		color: chatColors.darkText,
		borderRadius: "0.7rem",
	}),
	account: css({
		marginLeft: "auto",
		display: "flex",
		alignItems: "center",
		fontSize: "1.8rem",
		cursor: "pointer",
	}),
};

function HomeScreenHeader() {
	return (
		<div css={homeScreenCSS.header}>
			<div css={homeScreenCSS.brandName}>LavenderLine</div>
			<div css={homeScreenCSS.unreadChatCount}>12</div>
			<div css={homeScreenCSS.account}>
				<MdAccountCircle />
			</div>
		</div>
	);
}

function SearchBox() {
	return (
		<div>
			<input type="text" />
		</div>
	);
}

const ThreadComp: FC<{ thread: ThreadSummary }> = ({ thread }) => {
	const contacts = useContacts();
	const participants = thread.participants.map((p) =>
		contacts?.find((c) => c.id === p)
	);
	return (
		<div>
			{participants[0]?.name} - {thread.lastMessage.message}
		</div>
	);
};

function ChatList() {
	const threads = useThreads();
	return (
		<div>
			{threads?.map((t) => (
				<ThreadComp key={t.id} thread={t} />
			))}
		</div>
	);
}

export function HomeScreen() {
	return (
		<div css={homeScreenCSS.homeScreenContainer}>
			<HomeScreenHeader />
			<SearchBox />
			<ChatList />
		</div>
	);
}
