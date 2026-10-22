import React from "react";
import { Phone, MapPin, Mail, Clock, Instagram } from "lucide-react";
import Navbar from "./Navbar";
import "./Contato.css";

export default function Contato() {
  
  const abrirWhatsAppDireto = () => {
    const numeroLoja = "5519995729704";
    const mensagem = "Olá, Nana & Mimi! Vim pelo site e gostaria de tirar algumas dúvidas.";
    const url = `https://wa.me/${numeroLoja}?text=${encodeURIComponent(mensagem)}`;
    window.open(url, "_blank");
  };

  const abrirInstagramDireto = () => {
    const usuarioInstagram = "nanaemimimodainfantil";
    const url = `https://www.instagram.com/${usuarioInstagram}`;
    window.open(url, "_blank");
  };

  return (
    <div className="app">
      <Navbar />
      <main className="contato-container">
        <div className="contato-conteudo-central">
          <h1>Contato</h1>
          
          <div className="contato-texto">
            <p>Tem dúvidas sobre tamanhos, trocas, prazos de entrega ou quer saber mais sobre nossa coleção? Estamos sempre prontas para ajudar você com todo o carinho que a sua família merece!</p>
            <p>Adoramos conversar com quem compartilha do nosso amor pela moda infantil. Entre em contato conosco através dos canais abaixo:</p>
          </div>

          <div className="info-cards-central">
            {/* WhatsApp */}
            <div 
              className="card-item-central" 
              onClick={abrirWhatsAppDireto} 
              style={{ cursor: 'pointer', transition: 'transform 0.2s' }}
              title="Clique para conversar no WhatsApp"
            >
              <Phone size={22} color="#D87093" />
              <div>
                <strong>WhatsApp</strong>
                <p>(19) 99572-9704</p>
              </div>
            </div>

            {/* Email */}
            <div className="card-item-central">
              <Mail size={22} />
              <div>
                <strong>E-mail</strong>
                <p>nanaemimimodainfantil@gmail.com</p>
              </div>
            </div>
            
            {/* Instagram */}
            <div 
              className="card-item-central" 
              onClick={abrirInstagramDireto} 
              style={{ cursor: 'pointer', transition: 'transform 0.2s' }}
              title="Clique para acessar o Instagram"
            >
              <Instagram size={22} color="#E1306C" />
              <div>
                <strong>Instagram</strong>
                <p>@nanaemimimodainfantil</p>
              </div>
            </div>

            {/* Horário */}
            <div className="card-item-central">
              <Clock size={22} />
              <div>
                <strong>Horário de Atendimento</strong>
                <p>Segunda a Sábado, das 9h às 17h</p>
              </div>
            </div>

            {/* Localização */}
            <div className="card-item-central">
              <MapPin size={22} />
              <div>
                <strong>Localização</strong>
                <p>Rua José Ramos Catarino 396 Pq Tropical - Campinas/SP</p>
              </div>
            </div>
          </div>

          {/* O MAPA DO GOOGLE MAPS ENTRA AQUI */}
          <div style={{ marginTop: '30px', width: '100%', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
            <iframe
              title="Mapa de Localização Nana & Mimi"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3674.88788410287!2d-47.0544837!3d-22.9175493!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94c8cd4588e36785%3A0xb2cb27adcd65fb4!2sR.%20Jos%C3%A9%20Ramos%20Catarino%2C%20396%20-%20Parque%20Tropical%2C%20Campinas%20-%20SP%2C%2013046-240!5e0!3m2!1spt-BR!2sbr!4v1710000000000!5m2!1spt-BR!2sbr"
              width="100%"
              height="350"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>

        </div>
      </main>
    </div>
  );
}