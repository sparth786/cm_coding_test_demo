import React, {useEffect, useState} from "react";
import {useRouter} from 'next/router'
import NewsCard, {INewsCardType} from "../../components/NewsCard";
import client from "../../lib/algoliaService";
import {getHits} from "../../components/NewsData";

const newsDataClient = client.initIndex("news");

const IndexNews = () => {
    const { query } = useRouter()
    const [data, setData] = useState<INewsCardType | null>(null)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        if ("name" in query) {
            const queryData = {
                imageUrl: query.imageUrl as string,
                topics: JSON.parse(query.topics as string),
                name: query.name as string,
                description: query.description as string,
                publicationDate: query.publicationDate as string,
                organization: JSON.parse(query.organization as string)
            }
            setData(queryData)
            setIsLoading(false)
        }
        else {
            query['id'] && newsDataClient.search('')
                .then(({hits}) => {
                    const getAllHits = getHits(hits)
                    // @ts-ignore
                    const getNewsIndex = getAllHits.findIndex((hits) => hits.slug === query.id)
                    if (getNewsIndex !== -1 ){
                        const { imageUrl, topics, name, description, publicationDate, organization } = getAllHits[getNewsIndex]
                        setData({imageUrl, topics, name, description, publicationDate, organization})
                    }
                    setIsLoading(false)
                }).catch(err => {
                    setIsLoading(false)
                console.log(err);
            });
        }
    },[query, isLoading])

    if (isLoading) return <div><p>{"Data is loading"}</p></div>

        return (
            <div>
                <NewsCard
                    data={data}
                />
            </div>
        )

}

export default IndexNews