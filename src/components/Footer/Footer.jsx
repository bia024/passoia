import React from 'react';
import Contatos from '../Contatos/Contatos.jsx';

export default function Footer(){
  return (
    <FooterWrapper />
  );
}

function FooterWrapper(){
  return (
    <footer>
      <Contatos />
    </footer>
  );
}
