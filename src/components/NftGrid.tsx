import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { useRef, useCallback, useEffect, useState } from 'react';
import '../styles/_nftGrid.scss'
import NftCard from './NftCard';
import { ReactComponent as SearchIcon } from '../assets/searchIcon.svg';
import { ReactComponent as CloseIcon } from '../assets/closeIcon.svg';
import useDebounce from '../hooks/useDebounce';

const NftGrid = () => {
  //FETCH NFTS
	const fetchNfts = async (skip: number) => {
    try {
      const response = await fetch(
        `https://test-api.solsea.io/nft-listed/?$limit=20&$skip=${skip}`,
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
  
  //FETCH DATA AND IMPLEMENT INFINITE SCROLL
  const {
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    data,
    status,
    error,
    isError,
    isSuccess,
    isLoading,
  } = useInfiniteQuery(
    ['nfts'],
    ({ pageParam = 0 }) => fetchNfts(pageParam),
    {
      getNextPageParam: (lastPage, allPages) => {
        const nextPage = allPages.length * 20
        return lastPage.total > lastPage.skip ? nextPage : undefined
      },
      refetchOnWindowFocus: false,
      keepPreviousData: true,
    },
  );

  console.log(data);
  
  // FETCH NEW DATA WITH INTERSECTION OBSERVER
  const observerElem = useRef<HTMLDivElement>(null);

  const handleObserver = useCallback((entries: IntersectionObserverEntry[]) => {
    const [target] = entries;
    if (target.isIntersecting && hasNextPage) {
      fetchNextPage();
    }
  }, [fetchNextPage, hasNextPage]);

  useEffect(() => {
    const element = observerElem.current;
    const option = { threshold: 0 };

    const observer = new IntersectionObserver(handleObserver, option);
    observer.observe(element!);
    return () => observer.unobserve(element!);
  }, [fetchNextPage, hasNextPage, handleObserver]);

  //HANDLE SEARCH
  const [searchValue, setSearchValue] = useState('');
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value)
  }
  const handleClearSearch = () => {
    setSearchValue('')
  }
	const fetchNftByTitle = async (title: string) => {
    try {
      const response = await fetch(
        `https://test-api.solsea.io/nft-listed/?Title=${title}`,
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

  const debouncedSearchValue = useDebounce(searchValue);

  const searchResult = useQuery(
    ['nftsByTitle', debouncedSearchValue], 
    () => fetchNftByTitle(debouncedSearchValue),
    { enabled: Boolean(debouncedSearchValue) }
  );

  console.log('searchResult.data', searchResult.data);

  return (
    <div className='nftGrid'>
      <div className="searchInput ">
        <input
          placeholder="Search NFTs by title"
          value={searchValue}
          onChange={handleSearch}
        />
        {searchValue === '' ? (
          <SearchIcon className='searchAndClose'/>
        ) : (
          <CloseIcon onClick={handleClearSearch} className='searchAndClose'/>
        )}
      </div>
      {/* {isLoading && <h1 style={{textAlign: 'center', marginBlock: '1rem'}}>Loading...</h1>} */}
      {searchResult.data !== undefined ? (
        <>
          {(searchResult.isSuccess && searchResult.data.total > 0) ? (
            <div className='nftGridContainer'>
              {searchResult.data.data.map((nft: any) => (
                <NftCard
                  key={nft._id}
                  title={nft.Title}
                  image={nft.Preview_URL}
                  mint={nft.Mint}
                  collection={nft.nft_collection?.title}
                  views={nft.views}
                  likes={nft.liked}
                  currency={nft.currency}
                  price={nft.price}
                />
              ))}
            </div>
          )  : (
            <h1 className='noResults'>No results...</h1>
          )}
        </>
      ) : (
        <>
          <div className='nftGridContainer'>
            {isSuccess && data.pages.map(page => {
              return page.data.map((nft: any) => (
                  <NftCard
                    key={nft._id}
                    title={nft.Title}
                    image={nft.Preview_URL}
                    mint={nft.Mint}
                    collection={nft.nft_collection?.title}
                    views={nft.views}
                    likes={nft.liked}
                    currency={nft.currency}
                    price={nft.price}
                  />
                )
              )
            })}
          </div>
          <div className='loader' ref={observerElem}>
            {isLoading ? (<h1>Loading...</h1>) : (
              isFetchingNextPage && hasNextPage ? 'Loading...' : 'No search left'
            )}
          </div>
        </>
      )}
    </div>
  )
}

export default NftGrid;