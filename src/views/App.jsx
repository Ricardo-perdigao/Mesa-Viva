import { useEffect, useRef } from 'react';
import { useLandingViewModel } from '../viewmodels/useLandingViewModel.js';
import styles from './App.module.css';

function Wordmark() {
  return <a className={styles.wordmark} href="#inicio" aria-label="Mesa Viva, início"><span className={styles.wordmarkIcon}>m</span>mesa<span>viva</span><i>.</i></a>;
}

function Arrow({ diagonal = false }) {
  return <span aria-hidden="true">{diagonal ? '↗' : '→'}</span>;
}

function SignupModal({ open, submitted, onClose, onSubmit }) {
  const dialogRef = useRef(null);
  const successHeadingRef = useRef(null);
  const onCloseRef = useRef(onClose);
  onCloseRef.current = onClose;

  useEffect(() => {
    if (!open) return undefined;

    const previousFocus = document.activeElement;
    dialogRef.current?.querySelector('input')?.focus();

    function handleKeyDown(event) {
      if (event.key === 'Escape') {
        event.preventDefault();
        onCloseRef.current();
        return;
      }

      if (event.key !== 'Tab' || !dialogRef.current) return;

      const focusableElements = [...dialogRef.current.querySelectorAll(
        'button:not([disabled]), input:not([disabled]), a[href], [tabindex]:not([tabindex="-1"])',
      )].filter((element) => element.getClientRects().length > 0);

      if (!focusableElements.length) {
        event.preventDefault();
        return;
      }

      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];
      const activeIndex = focusableElements.indexOf(document.activeElement);

      if (event.shiftKey && (activeIndex <= 0 || !dialogRef.current.contains(document.activeElement))) {
        event.preventDefault();
        lastElement.focus();
      } else if (!event.shiftKey && (activeIndex === focusableElements.length - 1 || activeIndex === -1 || !dialogRef.current.contains(document.activeElement))) {
        event.preventDefault();
        firstElement.focus();
      }
    }

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      if (previousFocus instanceof HTMLElement && previousFocus.isConnected) previousFocus.focus();
    };
  }, [open]);

  useEffect(() => {
    if (submitted) successHeadingRef.current?.focus();
  }, [submitted]);

  if (!open) return null;

  return (
    <div className={styles.modalBackdrop} role="presentation" onMouseDown={(event) => event.target === event.currentTarget && onClose()}>
      <section ref={dialogRef} className={styles.modal} role="dialog" aria-modal="true" aria-labelledby="modal-title">
        <button className={styles.modalClose} type="button" onClick={onClose} aria-label="Fechar janela">×</button>
        {submitted ? (
          <div className={styles.successState}>
            <span className={styles.successIcon}>✓</span>
            <p className={styles.eyebrow}>que bom ter você aqui</p>
            <h2 ref={successHeadingRef} id="modal-title" tabIndex="-1">Seu lugar à mesa está guardado.</h2>
            <p>Cadastro simulado com sucesso! Em um projeto real, enviaríamos as novidades do cardápio para você.</p>
            <button className={styles.buttonPrimary} onClick={onClose}>Fechar <Arrow /></button>
          </div>
        ) : (
          <>
            <p className={styles.eyebrow}>um convite para comer bem</p>
            <h2 id="modal-title">Vamos colocar mais sabor na sua rotina?</h2>
            <p className={styles.modalCopy}>Deixe seu contato e receba o cardápio da semana direto na sua caixa de entrada.</p>
            <form className={styles.signupForm} onSubmit={onSubmit}>
              <label htmlFor="name">Seu nome</label>
              <input id="name" name="name" autoComplete="name" placeholder="Como podemos te chamar?" required />
              <label htmlFor="email">Seu melhor e-mail</label>
              <input id="email" name="email" type="email" autoComplete="email" placeholder="voce@email.com" required />
              <button className={styles.buttonPrimary} type="submit">Quero conhecer <Arrow /></button>
            </form>
            <small className={styles.privacyNote}>Sem compromisso. Só comida boa e novidades fresquinhas.</small>
          </>
        )}
      </section>
    </div>
  );
}

export default function App() {
  const vm = useLandingViewModel();

  return (
    <div className={styles.siteShell}>
      <div className={styles.announcement}><span>✳</span> Comida de verdade, feita com carinho e ingredientes da estação <a href="#como-funciona">Saiba mais <Arrow /></a></div>
      <header className={styles.header} id="inicio">
        <div className={styles.headerInner}>
          <Wordmark />
          <button className={styles.menuToggle} onClick={vm.toggleMenu} aria-expanded={vm.isMenuOpen} aria-label={vm.isMenuOpen ? 'Fechar menu' : 'Abrir menu'}>{vm.isMenuOpen ? '×' : '☰'}</button>
          <nav className={`${styles.navigation} ${vm.isMenuOpen ? styles.navigationOpen : ''}`} aria-label="Navegação principal">
            <a href="#cardapio" onClick={vm.closeMenu}>Cardápio</a>
            <a href="#como-funciona" onClick={vm.closeMenu}>Como funciona</a>
            <a href="#avaliacoes" onClick={vm.closeMenu}>Quem prova, ama</a>
            <button className={styles.headerCta} onClick={vm.openSignup}>Peça o seu <Arrow diagonal /></button>
          </nav>
        </div>
      </header>

      <main>
        <section className={styles.hero}>
          <div className={styles.heroCopy}>
            <p className={styles.eyebrow}><span>✳</span> O sabor de comer bem todos os dias</p>
            <h1>Uma mesa cheia.<br />Um dia <em>mais leve.</em></h1>
            <p className={styles.heroDescription}>Comida feita de verdade, com ingredientes frescos de pequenos produtores. Preparada com afeto e entregue prontinha na sua porta.</p>
            <div className={styles.heroActions}>
              <button className={styles.buttonPrimary} onClick={vm.openSignup}>Descobrir meu próximo prato <Arrow /></button>
              <a className={styles.textLink} href="#cardapio">Explorar cardápio <span>↓</span></a>
            </div>
            <div className={styles.socialProof}>
              <div className={styles.avatarStack} aria-hidden="true"><span>MA</span><span>JP</span><span>LC</span><span>+</span></div>
              <div><div className={styles.stars}>★★★★★ <b>4,9/5</b></div><small>mais de 2.400 mesas felizes</small></div>
            </div>
          </div>
          <div className={styles.heroVisual}>
            <div className={styles.heroPhotoFrame}><img src="https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=1500&q=90" alt="Mesa posta com pratos coloridos, legumes frescos e comida caseira" /></div>
            <div className={styles.photoBadge}><span>feito hoje</span><strong>com afeto <i>♥</i></strong></div>
            <div className={styles.floatingNote}><span className={styles.noteIcon}>✳</span><span>Da horta<br />pra sua mesa</span></div>
            <span className={styles.heroDoodle} aria-hidden="true">✳</span>
          </div>
          <div className={styles.heroBottomLabel}>COZINHA DE ESTAÇÃO · SÃO PAULO, SP</div>
        </section>

        <section className={styles.valueStrip} aria-label="Diferenciais Mesa Viva">
          <div><span>✳</span><p>Ingredientes <strong>de verdade</strong></p></div>
          <div><span>♡</span><p>Feito com <strong>afeto</strong></p></div>
          <div><span>↗</span><p>Direto de <strong>quem produz</strong></p></div>
          <div><span>◷</span><p>Pronto em <strong>minutos</strong></p></div>
        </section>

        <section className={styles.menuSection} id="cardapio">
          <div className={styles.sectionHeading}>
            <div><p className={styles.eyebrow}>O cardápio desta semana</p><h2>Fresco, honesto<br />e <em>feito pra você.</em></h2></div>
            <p className={styles.sectionIntro}>A gente cozinha com o que a estação tem de melhor. Cada semana traz uma combinação nova, preparada em pequenos lotes.</p>
          </div>
          <div className={styles.dishGrid}>
            {vm.dishes.map((dish, index) => (
              <article className={styles.dishCard} key={dish.name}>
                <div className={styles.dishImage}><img src={dish.image} alt={dish.alt} loading="lazy" /><span className={styles.dishTag}>{dish.tag}</span><span className={styles.dishNumber}>0{index + 1}</span></div>
                <div className={styles.dishInfo}><div><h3>{dish.name}</h3><p>{dish.detail}</p></div><strong>{dish.price}</strong></div>
              </article>
            ))}
          </div>
          <div className={styles.menuFooter}><p>O cardápio muda toda semana. <strong>Seu paladar merece novidades.</strong></p><button className={styles.buttonOutline} onClick={vm.openSignup}>Receber o cardápio <Arrow /></button></div>
        </section>

        <section className={styles.howSection} id="como-funciona">
          <div className={styles.howPhoto}><img src="https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1200&q=85" alt="Cozinheira preparando ingredientes frescos em uma cozinha iluminada" loading="lazy" /><span className={styles.photoCaption}>Da nossa cozinha, com carinho.</span></div>
          <div className={styles.howCopy}><p className={styles.eyebrow}>Sem complicação, só coisa boa</p><h2>O caminho mais curto<br />entre a <em>horta</em> e você.</h2><div className={styles.steps}>
            <div className={styles.step}><span>01</span><div><h3>Você escolhe</h3><p>Explore o cardápio da semana e escolha o que tem a sua cara.</p></div></div>
            <div className={styles.step}><span>02</span><div><h3>A gente prepara</h3><p>Cozinhamos em pequenos lotes, com ingredientes frescos e muito cuidado.</p></div></div>
            <div className={styles.step}><span>03</span><div><h3>Chega na sua mesa</h3><p>É só aquecer por alguns minutos. A parte gostosa já está pronta.</p></div></div>
          </div><button className={styles.buttonPrimary} onClick={vm.openSignup}>Quero experimentar <Arrow /></button></div>
        </section>

        <section className={styles.testimonialSection} id="avaliacoes">
          <div className={styles.testimonialHeader}><p className={styles.eyebrow}>Histórias que dão água na boca</p><h2>Quem prova, <em>fica.</em></h2><div className={styles.ratingSummary}><span className={styles.stars}>★★★★★</span> <strong>4,9 de 5</strong> · relatos fictícios para demonstração</div></div>
          <div className={styles.testimonialGrid}>{vm.testimonials.map((item) => <article className={styles.quoteCard} key={item.name}><span className={styles.quoteMark}>“</span><div className={styles.stars}>★★★★★</div><blockquote>{item.quote}</blockquote><div className={styles.reviewer}><span>{item.initials}</span><div><strong>{item.name}</strong><small>{item.detail}</small></div></div></article>)}</div>
        </section>

        <section className={styles.offerSection} id="assine">
          <div className={styles.offerDecor} aria-hidden="true">✳</div>
          <div className={styles.offerCopy}><p className={styles.eyebrow}>Seu lugar favorito é à mesa</p><h2>Uma semana mais gostosa<br />começa por <em>aqui.</em></h2><p>Experimente 5 pratos da semana e descubra como comida boa pode deixar sua rotina mais leve.</p><div className={styles.offerPerks}><span>✓ Sem taxa de adesão</span><span>✓ Cancele quando quiser</span><span>✓ Entrega inclusa na 1ª semana</span></div></div>
          <div className={styles.priceCard}><span className={styles.priceLabel}>primeira semana</span><div className={styles.price}><span>R$</span>149<small>,90</small></div><p>5 pratos fresquinhos<br />para deixar na geladeira</p><button className={styles.buttonCream} onClick={vm.openSignup}>Quero provar <Arrow /></button><small className={styles.priceFootnote}>Oferta fictícia para demonstração</small></div>
        </section>

        <section className={styles.faqSection} id="duvidas">
          <div className={styles.faqIntro}><p className={styles.eyebrow}>Ficou com alguma dúvida?</p><h2>A gente explica.<br /><em>Com calma.</em></h2><p>Se a resposta que você procura não estiver aqui, é só chamar. A conversa também faz parte da experiência.</p><a href="mailto:oi@mesaviva.example">oi@mesaviva.example <Arrow diagonal /></a></div>
          <div className={styles.faqList}>{vm.questions.map((item, index) => <article className={`${styles.faqItem} ${vm.activeQuestion === index ? styles.faqActive : ''}`} key={item.question}><button aria-expanded={vm.activeQuestion === index} onClick={() => vm.toggleQuestion(index)}><span>{item.question}</span><i>{vm.activeQuestion === index ? '−' : '+'}</i></button>{vm.activeQuestion === index && <p>{item.answer}</p>}</article>)}</div>
        </section>

        <section className={styles.lastCta}><span>✳</span><p>Tem coisa melhor que comida boa?</p><button onClick={vm.openSignup}>Só dividir a mesa. <Arrow diagonal /></button></section>
      </main>

      <footer className={styles.footer}><div className={styles.footerMain}><div><Wordmark /><p>Comida de verdade, vida mais leve.<br />Feito com afeto em São Paulo.</p></div><div className={styles.footerLinks}><a href="#cardapio">Cardápio</a><a href="#como-funciona">Como funciona</a><a href="#avaliacoes">Avaliações</a><a href="#duvidas">Dúvidas</a></div><div className={styles.footerSocial}><span>Encontre a gente por aí</span><a href="https://instagram.com" target="_blank" rel="noreferrer">Instagram <Arrow diagonal /></a></div></div><div className={styles.footerBottom}><span>© 2025 Mesa Viva · Projeto acadêmico com conteúdo demonstrativo</span><span>Feito com <i>♥</i> e comida de verdade</span></div></footer>
      <SignupModal open={vm.isModalOpen} submitted={vm.submitted} onClose={vm.closeSignup} onSubmit={vm.submitSignup} />
    </div>
  );
}
