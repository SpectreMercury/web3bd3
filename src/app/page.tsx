import CardsList from "@/components/ProjectCard/ProjectCard";
import mediaCardData from "@/data/mediaCard";
import  LogoImage  from '../assets/img/logo.png'
import {Button, Input} from "@mui/material";
import Image from "next/image";

export default function Home() {
  return (
    <main style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 16
    }}>
      <h1 className="text-black" style={{
          marginTop: 64
      }}>
          Find your partner easily
      </h1>
      <p className="text-grey" style={{
          width: 800,
          height: 48,
          textAlign: 'center',
          marginBottom: 64
      }}>
          Completely synergize resource taxing relationships via premier niche markets. Professionally  cultivate one-to-one customer service with robust ideas.
      </p>
      <Button variant="contained" color="primary" style={{
          padding: '12px 18px',
          borderRadius: 100,
          marginBottom: 64
      }}>Connect with your partners</Button>
      <input
        placeholder={'Search Project'}
        style={{
            width: 598,
            height: 58,
            padding: '0 24px',
            border: '1px solid #EAEBF0',
            borderRadius: 100,
            marginBottom: 64
        }}
      />
      <CardsList cardsData={mediaCardData} />
      <div style={{ textAlign: 'center', marginTop: 128}}>
          <Image alt={'logo'} src={LogoImage} style={{
              width: 95,
              height: 22
          }}/>
          <p style={{
              color: '#5F6D7E',
              fontSize: 16
          }}>© 2023 BD3. All Rights Reserved.</p>
      </div>
    </main>
  )
}
