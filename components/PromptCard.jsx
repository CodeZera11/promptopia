"use client"

import { useSession } from "next-auth/react";
import { useState } from "react";
import Image from "next/image";
import { usePathname,useRouter } from "next/navigation";

const PromptCard = ({ post, handleTagClick  }) => {

  const [copied, setCopied] = useState('')

  const handleProfileClick = () => {

  }

  const handleCopy = () => {
    setCopied(post.prompt)
    navigator.clipboard.writeText(post.prompt);
    setTimeout(()=> {setCopied("")}, 3000)
  }

  return (
  
    <div className="prompt_card">
      <div className="flex gap-3 items-start">
        <div className="flex justify-start items-center cursor-pointer" onClick={handleProfileClick}>
          <Image src={post.creator.image} alt="user_image" width={40} height={40} className="rounded-full object-contain" />
        </div>
      

      <div className="flex flex-col">
        <h3 className="font-satoshi font-semibold text-gray-900">
          {post.creator.username}
        </h3>
        <p className="font-inter text-sm text-gray-500">
          {post.creator.email}
        </p>
      </div>

          <div className="copy_btn" onClick={handleCopy}>
            <Image  src={copied === post.prompt ? "/assets/icons/tick.svg" : "/assets/icons/copy.svg"} 
                    alt= "copy"
                    width={12}
                    height={12}
            />
          </div>
          </div>

          <p className="mt-5 text-sm font-satoshi">{post.prompt}</p>
          <p  className="mt-2 text-xs blue_gradient font-inter cursor-pointer"
              onClick={() =>  handleTagClick && handleTagClick(post.tag)}
          >{post.tag}</p>
        </div>

        
       
  )
}

export default PromptCard