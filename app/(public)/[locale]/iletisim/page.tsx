'use client';
import Navbar from "@layout/Navbar";
import ContactInfo from "../../../sections/contact/ContactInfo";
import {ContactForm} from "@sections/contact";
import {SubscribeBar} from "@sections/home";

export default function Page() {
    return (
        <main>
            <Navbar/>
            <ContactInfo
                mapSrc="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4870.701690149938!2d27.0404500771908!3d38.50025817181166!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14bbd102a233dc97%3A0xcd4ac0b8ab8bf562!2sSarMez%20Workshop%20G%C4%B1da%20%C3%9Cretim%20San.%20Tic.%20Ltd.%20%C5%9Eti.!5e1!3m2!1str!2svi!4v1756885285640!5m2!1str!2svi"
            />
            <ContactForm className="mt-10" />
            <SubscribeBar/>
        </main>
    );
}