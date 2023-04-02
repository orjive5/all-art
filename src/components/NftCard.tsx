import { useNavigate } from 'react-router-dom';
import { INftCard } from '../types/nftCard.inteface';
import '../styles/_nftCard.scss';
import { ReactComponent as VerifiedBadge } from '../assets/verifiedBadge.svg';
import { ReactComponent as InfoIcon } from '../assets/infoIcon.svg';
import { ReactComponent as EyeIcon } from '../assets/eyeIcon.svg';
import { ReactComponent as HeartIcon } from '../assets/heartIcon.svg';
import { ReactComponent as CircleIcon } from '../assets/circleIcon.svg';
import { ReactComponent as Loader } from '../assets/loader.svg';
import { useEffect, useState } from 'react';

const NftCard = ({
  title,
  image,
  mint,
  collection,
  views,
  likes,
  currency,
  price,
}: INftCard) => {
    const navigate = useNavigate();
    const handleNavigate = () => {
        navigate(`/${mint}`)
    }
    const [loading, setLoading] = useState(true);
    const [calcPrice, setCalcPrice] = useState(0);
    const [calcCurrency, setCalcCurrency] = useState('');
    useEffect(() => {
      if (currency === 'HcmdrAuuysPj7XvJTQgFeQaaSZV5VGyG9TbJ89tCWW9z') {
        setCalcCurrency('AART');
        setCalcPrice(() => price / 1000000);
      } else {
        setCalcCurrency('SOL');
        setCalcPrice(() => price / 1000000000);
      }
    }, [])
    
  return (
    <div className='nftCard' key={mint}>
      <div className='container'>
        <div onClick={handleNavigate} className='imageContainer'>
          <Loader
            className='loader'
            style={{ display: loading ? "flex" : "none" }}
          />
          <div className='imageOverlay'>
            <div className='infoIcon'>
              <InfoIcon />
            </div>
            <div className='viewsAndLikes'>
              <div className='views'>
                <EyeIcon />
                <p>{views ? views : 0}</p>
              </div>
              <div className='likes'>
                <HeartIcon />
                <p>{likes ? likes : 0}</p>
              </div>
            </div>
            <div className='circleVerified'>
              <CircleIcon />
            </div>
          </div>
          <img
            onLoad={() => {
              setLoading(false);
            }}
            className="image full"
            style={{ opacity: loading ? 0 : 1 }}
            alt="nft pic"
            loading='lazy'
            src={image}
          />
        </div>
        <div className='infoContainer'>
          <h1 onClick={handleNavigate}>{title}</h1>
          <div onClick={handleNavigate} className='collection'>
            {collection ? (
              <>
                <h2>{collection}</h2>
                <VerifiedBadge className='verifiedBadge' />
              </>
            ) : (
            <h3>Not in a collection</h3>
            )}
          </div>
          <div className='price'>
            <h3>Price</h3>
            <h4>{calcCurrency} {calcPrice} </h4>
          </div>
        </div>
        <div className='buttonsContainer'>
          <button className='bidButton'>
            Bid
          </button>
          <button className='buyButton'>
            Buy
          </button>
        </div>
      </div>
    </div>
  )
}

export default NftCard;