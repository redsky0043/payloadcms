import RichText from "@/components/RichText"
import type { MainHeroBlock as MainHeroBlockProps } from '@/payload-types'
import Image from 'next/image'   
// import "./HeroSection.scss"

export const MainHero: React.FC<MainHeroBlockProps> = ({ richText, bannerText, buttonText, media }) => {
  return (
    <section className="hero" id="hero">
      <div className="container">
        <h1 className="hero__title">
          <span>
          {richText && <RichText className="mb-0" data={richText} enableGutter={false} />}
          </span>
        </h1>
        <div className="hero-banner">
          <p className="hero-banner__text">
            {bannerText}
          </p>
          <button className="button button--blue">
            {buttonText}
          </button>
        </div>
      </div>
      <div className="hero__img"> 
        <Image src={media?.url} alt={media?.alt} width={1000} height={100}/>
      </div>
    </section>
  )
}