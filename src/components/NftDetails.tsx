import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import '../styles/_nftDetails.scss';
import { ReactComponent as VerifiedBadge } from '../assets/verifiedBadge.svg';
import { ReactComponent as EyeIconGray } from '../assets/eyeIconGray.svg';
import { useEffect, useState } from 'react';
import { ReactComponent as Loader } from '../assets/loader.svg';

const NftDetails = () => {
    //GET URL PARAMS
    const params = useParams();
    //FETCH NFT DETAILS
    const fetchNft = async (mint?: string) => {
        try {
          const response = await fetch(
            `https://test-api.solsea.io/fetch-nft/${mint}`,
            {
              headers: {
                'Content-Type': 'application/json',
              },
            });
          const data = await response.json();
          return data;
        } catch (error) {
          console.error(error);
          throw error;
        }
    };

    const {data, isLoading, isError, isSuccess} = useQuery(
        ['nftsByTitle'], 
        () => fetchNft(params.Mint),
    );

    //PRICE AND CURRENCY
    const [calcPrice, setCalcPrice] = useState(0);
    const [calcCurrency, setCalcCurrency] = useState('');
    useEffect(() => {
        if (data) {
            if (data.currency === 'HcmdrAuuysPj7XvJTQgFeQaaSZV5VGyG9TbJ89tCWW9z') {
            setCalcCurrency('AART');
            setCalcPrice(() => data.price / 1000000);
            } else {
                setCalcCurrency('SOL');
                setCalcPrice(() => data.price / 1000000000);
            }
        }
    }, [data]);

    //LOAD IMAGE
    const [loading, setLoading] = useState(true);

    //CLEAR QUERY CACHE ON BACK
    const queryClient = useQueryClient();

    useEffect(() => {
        const handlePopstate = () => {
            queryClient.removeQueries(['nftsByTitle'])
        };

        window.addEventListener('popstate', handlePopstate);

        return () => {
            window.removeEventListener('popstate', handlePopstate);
        };
    }, [queryClient]);

  return (
    <div className='nftDetails'>
        {isLoading || loading && <h1>Loading...</h1>}
        {isError && <h1>Something went wrong, please try again...</h1>}
        {isSuccess && (
        <>
            <div style={{ visibility: loading ? "hidden" : "visible" }} className='collectionContainer'>
                <Loader
                    className='loader'
                    style={{ display: loading ? "flex" : "none" }}
                />
                <img
                    style={{ opacity: loading ? 0 : 1 }}
                    alt="nft pic"
                    loading='lazy'
                    src={data.Preview_URL}
                />
                <div className='collectionInfo'>
                    <div className='collectionTitle'>
                        <h2>{data.nft_collection?.title}</h2>
                        <VerifiedBadge className='verifiedBadge' />
                    </div>
                    <h2 className='collectionDescription'>{data.nft_collection?.description}</h2>
                </div>
            </div>
            <div style={{ visibility: loading ? "hidden" : "visible" }} className='mainContainer'>
                <div className='imageSection'>
                    <div className='imageContainer'>
                        <Loader
                            className='loader'
                            style={{ display: loading ? "flex" : "none" }}
                        />
                        <img
                            onLoad={() => {
                                setLoading(false);
                            }}
                            style={{ opacity: loading ? 0 : 1 }}
                            alt="nft pic"
                            loading='lazy'
                            src={data.Preview_URL}
                        />
                    </div>
                    <div className='dataContainer'>
                        <div className='dataBox'>
                            <div className='views'>
                                <EyeIconGray style={{stroke: 'black'}}/>
                                <p>{data.views === 0 ? 0 : data.views}</p>
                                <h2>Views</h2>
                            </div>
                            <div className='likes'>
                                <EyeIconGray style={{stroke: 'black'}}/>
                                <p>{data.liked === 0 ? 0 : data.liked}</p>
                                <h2>Likes</h2>
                            </div>
                            <div className='openArtwork'>
                                <h2>Open Artwork</h2>
                            </div>
                        </div>
                        <div className='share'>
                            <h2>
                                Share
                            </h2>
                        </div>
                    </div>
                    <div className='descriptionContainer'>
                        <h2>{data.Description}</h2>
                    </div>
                </div>
                <div className='infoColumn'>
                    <div className='topHolder'>
                        <div className='categoryContainer'>
                            {data.collectionCategory && <h2>{data.collectionCategory}</h2>}
                            {data.collectionSubcategory && <h2>{data.collectionSubcategory}</h2>}
                        </div>
                        <button>
                            <svg style={{marginRight: "5px"}} stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                                <path fill="none" d="M0 0h24v24H0z"></path>
                                <path d="M17.65 6.35A7.958 7.958 0 0012 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08A5.99 5.99 0 0112 18c-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z"></path>
                            </svg>
                            Reload
                        </button>
                    </div>
                    <div className='titleContainer'>
                        <h1>{data.Title}</h1>
                    </div>
                    <div className='priceContainer'>
                        <h2>{calcCurrency} {calcPrice}</h2>
                    </div>
                    <div className='buyButtonsContainer'>
                        <button className='buyButton'>Buy NFT</button>
                        <button className='bidButton'>Place a Bid</button>
                    </div>
                </div>
            </div>
        </>)}
    </div>
  )
}

export default NftDetails;