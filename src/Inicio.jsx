import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { Link, useSearchParams } from "react-router-dom";
import "swiper/css";

import "./Inicio.css";
import Navbar from "./Navbar";
import { apiFetch, formatarPreco, normalizarImagem } from "./api";

import slider1 from "./assets/slider1.png";
import slider2 from "./assets/slider2.png";

export default function Inicio() {
  const [searchParams] = useSearchParams();
  const termoBusca = searchParams.get("busca") || "";
  const [produtos, setProdutos] = useState([]);
  const [carregandoProdutos, setCarregandoProdutos] = useState(true);
  const [erroProdutos, setErroProdutos] = useState("");

  useEffect(() => {
    let ativo = true;

    async function carregarProdutos() {
      try {
        setCarregandoProdutos(true);
        const data = await apiFetch("/products");

        if (ativo) {
          setProdutos(
            (data || []).map((produto) => ({
              ...produto,
              id: Number(produto.id),
              preco: Number(produto.preco),
              preco_antigo:
                produto.preco_antigo == null
                  ? null
                  : Number(produto.preco_antigo),
              imagem: normalizarImagem(produto.imagem),
            }))
          );
          setErroProdutos("");
        }
      } catch (erro) {
        console.error(erro);
        if (ativo) setErroProdutos("Não foi possível carregar os produtos.");
      } finally {
        if (ativo) setCarregandoProdutos(false);
      }
    }

    carregarProdutos();

    return () => {
      ativo = false;
    };
  }, []);

  // Busca por termo de pesquisa no Navbar
  const produtosFiltrados = produtos.filter((produto) =>
    String(produto.nome || "")
      .toLowerCase()
      .includes(termoBusca.toLowerCase())
  );

  // Agrupa os produtos dinamicamente por coleção/categoria
  const colecoesMap = produtos.reduce((acc, produto) => {
    if (produto.categoria && String(produto.categoria).trim() !== "") {
      const nomeColecao = String(produto.categoria).trim();
      if (!acc[nomeColecao]) acc[nomeColecao] = [];
      acc[nomeColecao].push(produto);
    }
    return acc;
  }, {});

  // Função para formatar o nome da coleção para exibição no título
  const formatarNomeColecao = (nome) => {
    if (!nome) return "";
    const minusculo = nome.toLowerCase();

    if (minusculo === "nana-mimi" || minusculo === "nana & mimi") {
      return "Coleção Nana & Mimi";
    }
    if (minusculo === "conforto-estilo" || minusculo === "conforto & estilo") {
      return "Conforto & Estilo";
    }

    // Troca traços por espaços e deixa as palavras com a primeira letra maiúscula
    return nome
      .replace(/-/g, " ")
      .replace(/\b\w/g, (letra) => letra.toUpperCase());
  };

  const renderCard = (item) => (
    <div key={item.id} className="card-wrapper">
      <Link to={`/produto/${item.id}`} className="card-link">
        <div className="card">
          {item.imagem ? (
            <img src={item.imagem} alt={item.nome} />
          ) : (
            <div className="imagem-sem-produto">Imagem indisponível</div>
          )}

          <p className="nome">{item.nome}</p>

          <p className="preco-antigo">
            {item.preco_antigo ? (
              <del>{formatarPreco(item.preco_antigo)}</del>
            ) : null}
          </p>

          <p className="preco">{formatarPreco(item.preco)}</p>
        </div>
      </Link>
    </div>
  );

  return (
    <div className="app">
      <Navbar />

      <div className="banner">
        <Swiper
          modules={[Autoplay]}
          slidesPerView={1}
          autoplay={{ delay: 3000 }}
          loop
        >
          <SwiperSlide>
            <img src={slider1} alt="Moda Nana & Mimi" />
          </SwiperSlide>

          <SwiperSlide>
            <img src={slider2} alt="Moda Nana & Mimi" />
          </SwiperSlide>
        </Swiper>
      </div>

      <div className="info-barra">
        <div>💳 Parcele em até 12x</div>
        <div>🚛 Frete grátis acima de R$199</div>
        <div>🛡️ Site seguro</div>
        <div>🎯 Produto de qualidade</div>
      </div>

      {carregandoProdutos ? (
        <p className="mensagem-produtos">Carregando produtos...</p>
      ) : erroProdutos ? (
        <p className="mensagem-produtos erro">{erroProdutos}</p>
      ) : termoBusca.trim() !== "" ? (
        <>
          <h2 className="titulo-fileira">
            Resultados para "{termoBusca}"
          </h2>

          <div className="produtos">
            {produtosFiltrados.length > 0 ? (
              produtosFiltrados.map(renderCard)
            ) : (
              <p className="nenhum-produto">Nenhum produto encontrado.</p>
            )}
          </div>
        </>
      ) : (
        <>
          {/* Fileiras Dinâmicas de Coleções */}
          {Object.entries(colecoesMap).map(([nomeColecao, listaProdutos]) => (
            <div key={nomeColecao}>
              <h2 className="titulo-fileira">
                {formatarNomeColecao(nomeColecao)}
              </h2>
              <div className="produtos">
                {listaProdutos.map(renderCard)}
              </div>
            </div>
          ))}

          {/* Seção Geral: Todas as Roupas */}
          <h2 className="titulo-fileira">Todas as nossas opções</h2>
          <div className="produtos">
            {produtos.length > 0 ? (
              produtos.map(renderCard)
            ) : (
              <p className="nenhum-produto">Nenhum produto cadastrado no momento.</p>
            )}
          </div>
        </>
      )}
    </div>
  );
}