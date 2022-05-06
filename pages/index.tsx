import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import React from "react";

import { Post } from "../components/post";
import { NavBar } from "../components/navBar";
import { request } from "../helpers/context";

const Home: NextPage = () => {
	const [posts, setPosts] = React.useState<any>();

	if (posts) {
		return (
			<div className="font-sans min-h-screen bg-gray-900">
				<NavBar />

				<div className="flex flex-col items-center w-full h-full">
					<div className="items-center w-1/3 mt-20">
						{posts.map((post: any) => (
							<div
								key={post.id}
								className="flex flex-col w-full items-center my-5"
							>
								<Post
									userName={post.pet.owner.name}
									petName={post.pet.name}
									content={post.content}
								/>
							</div>
						))}
					</div>
				</div>
			</div>
		);
	} else {
		request
			.get("/post/getAllPosts")
			.then((response) => {
				if (response.status === 200) {
					setPosts(response.data.reverse());
				}
			})
			.catch(console.error);
		return (
			<div className="font-sans min-h-screen bg-gray-900">
				<p>Loading</p>
			</div>
		)
	}
};

export default Home;
