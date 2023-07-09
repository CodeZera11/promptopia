"use client"

import {useState, useEffect} from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import Profile from '@components/Profile';


const MyProfile = () => {

    const [posts, setPosts] = useState([]);
    const {data: session} = useSession();

    const handleDelete = () => {
        
    }

    const handleEdit = () => {

    }

    useEffect(()=>{
        const fetchPosts = async () => {
            const response = await fetch(`/api/users/${session?.user.id}/posts`);
            const data = await response.json();
            console.log(response)
            setPosts(data)
        }
        if(session?.user.id) fetchPosts();
    }, [])

    return (
        <Profile
            name="My"
            desc="Welcome to your personalized page"
            data={posts}
            handleDelete={handleDelete}
            handleEdit={handleEdit}
        />
    )
}

export default MyProfile