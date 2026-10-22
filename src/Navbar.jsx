import React, { useState, useEffect } from "react";
import { CircleUserRound, ShoppingCart, Search } from "lucide-react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "./AuthContext";
import { useCarrinho } from "./CarrinhoContext";
import logo from "./assets/logo.jpg";
import "./Navbar.css";

export default function Navbar() {
  const { usuario, isLogado } = useAuth();
  const { carrinho } = useCarrinho();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  // Pega o termo de busca atual da URL (se existir)
  const termoURL = searchParams.get("busca") || "";
  const [termoBusca, setTermoBusca] = useState(termoURL);

  // Mantenha o input sincronizado com a URL
  useEffect(() => {
    setTermoBusca(termoURL);
  }, [termoURL]);

  // Função para redirecionar e filtrar na hora
  const handleBuscaChange = (valor) => {
    setTermoBusca(valor);
    if (valor.trim()) {
      navigate(`/?busca=${encodeURIComponent(valor)}`);
    } else {
      navigate("/");
    }
  };

  const totalItens = carrinho.reduce(
    (total, item) => total + Number(item.quantidade || 0),
    0
  );

  return (
    <header className="site-navbar">
      <Link to="/" className="site-navbar-logo" aria-label="Nana & Mimi">
        <img src={logo} alt="Nana & Mimi" />
      </Link>

      <nav className="site-navbar-menu">
        <Link to="/sobre-nos">Sobre nós</Link>
        <Link to="/contato">Contato</Link>
        <Link to="/">Roupas</Link>
      </nav>

      <div className="site-navbar-search">
        <input
          type="text"
          placeholder="Buscar produto..."
          value={termoBusca}
          onChange={(e) => handleBuscaChange(e.target.value)}
        />
        <Search size={19} />
      </div>

      <div className="site-navbar-actions">
        <Link
          to={isLogado ? "/minha-conta" : "/login"}
          className="site-navbar-account"
          title={isLogado ? "Minha conta" : "Entrar"}
        >
          <CircleUserRound size={30} />
          <span>
            <strong>{isLogado ? usuario?.nome || "Olá!" : "Entrar"}</strong>
            <small>Minha conta</small>
          </span>
        </Link>

        <Link to="/carrinho" className="site-navbar-cart" title="Carrinho">
          <ShoppingCart size={30} />
          {totalItens > 0 && (
            <b>{totalItens}</b>
          )}
        </Link>
      </div>
    </header>
  );
}