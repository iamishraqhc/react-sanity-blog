import React, { useState, useEffect } from 'react'
import { useParams } from "react-router-dom"
import SanityClient from '../client'
import imageUrlBuilder from '@sanity/image-url'
import BlockContent from '@sanity/block-content-to-react'

const builder = imageUrlBuilder(SanityClient)

const urlFor = (source) => {
    return builder.image(source)
}

const OnePost = () => {
    const [postData, setPostData] = useState(null)
    const { slug } = useParams()

    useEffect(() => {
        SanityClient.fetch(
            `*[slug.current == $slug]{
                title,
                slug,
                mainImage{
                    asset->{
                        _id,
                        url
                    }
                },
                body,
                "name": author->name,
                "authorImage": author->image
            }`,
            { slug }
        )
        .then((data) => setPostData(data[0]))
        .catch(err => console.error(err))
    }, [slug])

    if (!postData) return <div>Loading...</div>
    
    return (
        <div className="bg-gray-200 min-h-screen p-12">
            <div className="container shadow-lg mx-auto bg-green-100 rounded-lg">
                <div className="relative">
                    <div className="absolute h-full w-full flex items-center justify-center p-8">
                        <div className="bg-white bg-opacity-75 rounded p-12">
                            <h2 className="cursive text-3xl lg:text-6xl mb-4">
                                {postData.title}
                            </h2>
                            <div className="flex justify-center text-gray-800">
                                <img
                                    src={urlFor(postData.authorImage).url()}
                                    className="w-10 h-10 rounded-full"
                                    alt="Author is Ishraq"
                                />
                                <h4 className="cursive flex items-center pl-2 text-2xl">
                                    {postData.name}
                                </h4>
                            </div>
                        </div>
                    </div>
                    <img
                        className="w-full object-cover rounded-t"
                        src={urlFor(postData.mainImage).url()}
                        alt=""
                        style={{ height: "400px" }}
                    />
                </div>
                <div className="px-16 lg:px-48 py-12 lg:py-20 prose lg:prose-xl max-w-full">
                    <BlockContent
                        blocks={postData.body}
                        projectId={SanityClient.clientConfig.projectId}
                        dataset={SanityClient.clientConfig.dataset}
                    />
                </div>
            </div>
      </div>
    )
}

export default OnePost
