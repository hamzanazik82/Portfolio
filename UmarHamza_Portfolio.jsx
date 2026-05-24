import { motion, useScroll, useTransform, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect } from "react";

/* ─── GLOBAL STYLES ─── */
const GlobalStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;0,700;1,300;1,400&family=Outfit:wght@300;400;500;600;700&display=swap');
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    html { scroll-behavior: smooth; }
    ::-webkit-scrollbar { width: 3px; }
    ::-webkit-scrollbar-track { background: #070707; }
    ::-webkit-scrollbar-thumb { background: linear-gradient(#E8A020,#FF6B35); border-radius: 2px; }
    .grad { background: linear-gradient(135deg,#E8A020,#FF6B35); -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text; }
    input::placeholder, textarea::placeholder { color: #3a3a3a; }
    input:focus, textarea:focus { outline: none; border-color: #E8A020 !important; }
    a { cursor: pointer; }
  `}</style>
);

/* ─── VARIANTS ─── */
const fadeUp    = { hidden:{opacity:0,y:55},    visible:{opacity:1,y:0} };
const fadeDown  = { hidden:{opacity:0,y:-40},   visible:{opacity:1,y:0} };
const slideL    = { hidden:{opacity:0,x:-70},   visible:{opacity:1,x:0} };
const slideR    = { hidden:{opacity:0,x:70},    visible:{opacity:1,x:0} };
const scaleIn   = { hidden:{opacity:0,scale:.82},visible:{opacity:1,scale:1} };
const stagger   = { hidden:{}, visible:{ transition:{ staggerChildren:.13 } } };
const staggerFast={ hidden:{}, visible:{ transition:{ staggerChildren:.07 } } };

const tx = { duration:.7, ease:[0.22,1,0.36,1] };

/* ─── SCROLL PROGRESS BAR ─── */
const ScrollBar = () => {
  const { scrollYProgress } = useScroll();
  return (
    <motion.div style={{
      position:"fixed",top:0,left:0,right:0,height:2,zIndex:9999,
      background:"linear-gradient(90deg,#E8A020,#FF6B35)",
      scaleX:scrollYProgress, transformOrigin:"left"
    }}/>
  );
};

/* ─── FLOATING PARTICLES ─── */
const Particles = () => (
  <div style={{position:"absolute",inset:0,overflow:"hidden",pointerEvents:"none"}}>
    {Array.from({length:22},(_,i)=>(
      <motion.div key={i}
        animate={{ y:[0,-35,0], opacity:[.08,.45,.08] }}
        transition={{ duration:9+Math.random()*8, repeat:Infinity, delay:i*.28, ease:"easeInOut" }}
        style={{
          position:"absolute",
          left:`${Math.random()*100}%`, top:`${Math.random()*100}%`,
          width: 1.5+Math.random()*3, height: 1.5+Math.random()*3,
          borderRadius:"50%",
          background: i%2===0 ? "#E8A020" : "#FF6B35"
        }}
      />
    ))}
  </div>
);

/* ─── NAVBAR ─── */
const Navbar = () => {
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  useEffect(()=>{ const u=scrollY.on("change",v=>setScrolled(v>60)); return u; },[scrollY]);

  const links = ["About","Services","Skills","Projects","Contact"];
  return (
    <motion.nav
      variants={fadeDown} initial="hidden" animate="visible"
      transition={{ duration:.7, ease:"easeOut" }}
      style={{
        position:"fixed",top:0,left:0,right:0,zIndex:1000,
        padding:"1.1rem 4%",
        display:"flex",alignItems:"center",justifyContent:"space-between",
        background: scrolled ? "rgba(7,7,7,0.94)" : "transparent",
        backdropFilter: scrolled ? "blur(18px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(232,160,32,0.12)" : "none",
        transition:"all .35s ease"
      }}
    >
      <motion.div whileHover={{scale:1.04}} style={{display:"flex",alignItems:"center",gap:".5rem"}}>
        <span className="grad" style={{fontFamily:"'Cormorant Garamond',serif",fontSize:"1.7rem",fontWeight:700}}>UH</span>
        <span style={{color:"#444",fontSize:".75rem",letterSpacing:".22em",textTransform:"uppercase",fontFamily:"'Outfit',sans-serif"}}>Portfolio</span>
      </motion.div>

      <div style={{display:"flex",gap:"2.2rem",alignItems:"center"}}>
        {links.map((l,i)=>(
          <motion.a key={l} href={`#${l.toLowerCase()}`}
            initial={{opacity:0,y:-18}} animate={{opacity:1,y:0}}
            transition={{delay:.12*i+.3}}
            whileHover={{color:"#E8A020"}}
            style={{color:"#666",textDecoration:"none",fontSize:".8rem",letterSpacing:".12em",textTransform:"uppercase",fontFamily:"'Outfit',sans-serif",fontWeight:500,transition:"color .2s"}}
          >{l}</motion.a>
        ))}
        <motion.a href="mailto:hamzanazik82@gmail.com"
          whileHover={{scale:1.05,boxShadow:"0 0 30px rgba(232,160,32,.35)"}}
          whileTap={{scale:.97}}
          style={{
            background:"linear-gradient(135deg,#E8A020,#FF6B35)",
            color:"#070707",padding:".52rem 1.35rem",borderRadius:"2px",
            fontSize:".78rem",textDecoration:"none",fontWeight:700,
            letterSpacing:".1em",textTransform:"uppercase",fontFamily:"'Outfit',sans-serif"
          }}
        >Hire Me</motion.a>
      </div>
    </motion.nav>
  );
};

/* ─── HERO ─── */
const Hero = () => {
  const { scrollY } = useScroll();
  const y   = useTransform(scrollY,[0,500],[0,130]);
  const opa = useTransform(scrollY,[0,400],[1,0]);

  const words = ["E-Commerce","&","Digital","Marketing","Specialist"];
  return (
    <section style={{
      minHeight:"100vh",display:"flex",alignItems:"center",justifyContent:"center",
      position:"relative",overflow:"hidden",
      background:"linear-gradient(160deg,#0d0a04 0%,#070707 45%,#04080e 100%)"
    }}>
      {/* grid */}
      <div style={{position:"absolute",inset:0,backgroundImage:"linear-gradient(rgba(232,160,32,.025) 1px,transparent 1px),linear-gradient(90deg,rgba(232,160,32,.025) 1px,transparent 1px)",backgroundSize:"65px 65px"}}/>
      {/* orbs */}
      <motion.div animate={{scale:[1,1.15,1],opacity:[.06,.1,.06]}} transition={{duration:7,repeat:Infinity}}
        style={{position:"absolute",top:"15%",left:"8%",width:500,height:500,borderRadius:"50%",background:"radial-gradient(circle,rgba(232,160,32,.12) 0%,transparent 70%)",filter:"blur(50px)"}}/>
      <motion.div animate={{scale:[1,1.2,1],opacity:[.05,.09,.05]}} transition={{duration:9,repeat:Infinity,delay:2}}
        style={{position:"absolute",bottom:"15%",right:"8%",width:380,height:380,borderRadius:"50%",background:"radial-gradient(circle,rgba(255,107,53,.1) 0%,transparent 70%)",filter:"blur(50px)"}}/>
      <Particles/>

      <motion.div style={{y,opacity:opa,textAlign:"center",position:"relative",zIndex:1,padding:"0 5%"}}>
        {/* badge */}
        <motion.div
          initial={{opacity:0,scale:.8}} animate={{opacity:1,scale:1}} transition={{duration:.6,delay:.2}}
          style={{display:"inline-flex",alignItems:"center",gap:".55rem",border:"1px solid rgba(232,160,32,.28)",padding:".38rem 1.2rem",borderRadius:"100px",marginBottom:"2.2rem",background:"rgba(232,160,32,.04)"}}
        >
          <motion.span animate={{opacity:[1,.3,1]}} transition={{duration:2,repeat:Infinity}}
            style={{width:7,height:7,borderRadius:"50%",background:"#E8A020",display:"inline-block"}}/>
          <span style={{color:"#E8A020",fontSize:".72rem",letterSpacing:".22em",textTransform:"uppercase",fontWeight:500,fontFamily:"'Outfit',sans-serif"}}>Available for Projects</span>
        </motion.div>

        {/* name */}
        <div style={{overflow:"hidden",marginBottom:".8rem"}}>
          <motion.h1
            initial={{y:110,opacity:0}} animate={{y:0,opacity:1}}
            transition={{duration:1,ease:[0.22,1,0.36,1],delay:.3}}
            style={{fontFamily:"'Cormorant Garamond',serif",fontSize:"clamp(3.5rem,9.5vw,9rem)",fontWeight:700,lineHeight:1,letterSpacing:"-.02em",color:"#fafafa"}}
          >
            Umar <span className="grad">Hamza</span>
          </motion.h1>
        </div>

        {/* role words stagger */}
        <motion.div variants={staggerFast} initial="hidden" animate="visible"
          style={{display:"flex",flexWrap:"wrap",justifyContent:"center",gap:".5rem",marginBottom:"1.8rem"}}
        >
          {words.map((w,i)=>(
            <motion.span key={i} variants={fadeUp} transition={{duration:.5}}
              style={{fontFamily:"'Outfit',sans-serif",fontSize:"clamp(.95rem,2.2vw,1.45rem)",fontWeight: w==="&"?300:400,color: w==="&"?"#E8A020":"#888",letterSpacing:".04em"}}
            >{w}</motion.span>
          ))}
        </motion.div>

        {/* tagline */}
        <motion.p
          initial={{opacity:0,y:22}} animate={{opacity:1,y:0}} transition={{delay:.95,duration:.6}}
          style={{color:"#555",fontSize:".98rem",maxWidth:"480px",margin:"0 auto 2.8rem",lineHeight:1.85,fontFamily:"'Outfit',sans-serif"}}
        >
          Driving revenue growth through data-driven e-commerce strategies,
          high-converting ad campaigns & powerful brand experiences.
        </motion.p>

        {/* CTAs */}
        <motion.div initial={{opacity:0,y:28}} animate={{opacity:1,y:0}} transition={{delay:1.1,duration:.6}}
          style={{display:"flex",gap:"1rem",justifyContent:"center",flexWrap:"wrap"}}
        >
          <motion.a href="#projects" whileHover={{scale:1.05,boxShadow:"0 0 40px rgba(232,160,32,.32)"}} whileTap={{scale:.97}}
            style={{background:"linear-gradient(135deg,#E8A020,#FF6B35)",color:"#070707",padding:".85rem 2.4rem",borderRadius:"2px",fontSize:".82rem",textDecoration:"none",fontWeight:700,letterSpacing:".12em",textTransform:"uppercase",fontFamily:"'Outfit',sans-serif"}}
          >View Work</motion.a>
          <motion.a href="#contact" whileHover={{scale:1.05,borderColor:"rgba(232,160,32,.6)",color:"#E8A020"}} whileTap={{scale:.97}}
            style={{border:"1px solid #252525",color:"#888",padding:".85rem 2.4rem",borderRadius:"2px",fontSize:".82rem",textDecoration:"none",fontWeight:500,letterSpacing:".12em",textTransform:"uppercase",fontFamily:"'Outfit',sans-serif",transition:"all .25s"}}
          >Get In Touch</motion.a>
        </motion.div>
      </motion.div>

      {/* scroll cue */}
      <motion.div initial={{opacity:0}} animate={{opacity:1}} transition={{delay:1.8}}
        style={{position:"absolute",bottom:"2rem",left:"50%",transform:"translateX(-50%)",display:"flex",flexDirection:"column",alignItems:"center",gap:".4rem"}}
      >
        <span style={{color:"#363636",fontSize:".65rem",letterSpacing:".2em",textTransform:"uppercase",fontFamily:"'Outfit',sans-serif"}}>Scroll</span>
        <motion.div animate={{y:[0,10,0]}} transition={{duration:1.6,repeat:Infinity}}
          style={{width:1,height:38,background:"linear-gradient(to bottom,#E8A020,transparent)"}}/>
      </motion.div>
    </section>
  );
};

/* ─── SECTION HEADER ─── */
const SectionHeader = ({num,sub,title}) => {
  const ref = useRef(null);
  const inV = useInView(ref,{once:true,margin:"-100px"});
  return (
    <div ref={ref} style={{marginBottom:"4rem"}}>
      <motion.div variants={slideL} initial="hidden" animate={inV?"visible":"hidden"} transition={{duration:.5}}
        style={{color:"#E8A020",fontSize:".7rem",letterSpacing:".28em",textTransform:"uppercase",marginBottom:".7rem",fontWeight:500,fontFamily:"'Outfit',sans-serif"}}
      >{num} — {sub}</motion.div>
      <motion.h2 variants={fadeUp} initial="hidden" animate={inV?"visible":"hidden"} transition={{duration:.7,delay:.1}}
        style={{fontFamily:"'Cormorant Garamond',serif",fontSize:"clamp(2.3rem,5vw,4rem)",fontWeight:700,lineHeight:1.1,color:"#fafafa"}}
      >{title}</motion.h2>
      <motion.div initial={{scaleX:0,originX:0}} animate={inV?{scaleX:1}:{}} transition={{duration:.9,delay:.3}}
        style={{height:2,width:70,background:"linear-gradient(90deg,#E8A020,#FF6B35)",marginTop:"1rem"}}/>
    </div>
  );
};

/* ─── ABOUT ─── */
const About = () => {
  const ref = useRef(null);
  const inV = useInView(ref,{once:true,margin:"-100px"});
  const stats=[{n:"5+",l:"Years Experience"},{n:"150+",l:"Projects Done"},{n:"$2M+",l:"Revenue Generated"},{n:"50+",l:"Happy Clients"}];
  const tags=["Amazon FBA","Shopify","Google Ads","Meta Ads","SEO","Email Marketing"];

  return (
    <section id="about" ref={ref} style={{padding:"8rem 5%",background:"#070707"}}>
      <div style={{maxWidth:1180,margin:"0 auto"}}>
        <SectionHeader num="01" sub="Who I Am" title="Scaling Brands With Purpose"/>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"5rem",alignItems:"center"}}>

          {/* text */}
          <motion.div variants={slideL} initial="hidden" animate={inV?"visible":"hidden"} transition={{...tx,delay:.2}}>
            <p style={{color:"#777",lineHeight:1.95,fontSize:"1rem",marginBottom:"1.4rem",fontFamily:"'Outfit',sans-serif"}}>
              I'm <strong style={{color:"#ddd"}}>Umar Hamza</strong>, an experienced E-Commerce &amp; Digital Marketing Specialist
              with a proven track record of building and scaling online businesses across global markets.
            </p>
            <p style={{color:"#777",lineHeight:1.95,fontSize:"1rem",marginBottom:"2.2rem",fontFamily:"'Outfit',sans-serif"}}>
              From Amazon FBA optimization to high-converting Shopify stores and data-driven ad campaigns —
              I combine strategic thinking with hands-on execution to deliver measurable, lasting growth.
            </p>
            <motion.div variants={stagger} initial="hidden" animate={inV?"visible":"hidden"} style={{display:"flex",flexWrap:"wrap",gap:".6rem"}}>
              {tags.map(t=>(
                <motion.span key={t} variants={scaleIn} transition={{duration:.4}}
                  whileHover={{borderColor:"#E8A020",color:"#E8A020",background:"rgba(232,160,32,.05)"}}
                  style={{border:"1px solid rgba(232,160,32,.22)",color:"#B87818",padding:".28rem .85rem",borderRadius:"2px",fontSize:".75rem",letterSpacing:".08em",fontFamily:"'Outfit',sans-serif",transition:"all .2s"}}
                >{t}</motion.span>
              ))}
            </motion.div>
          </motion.div>

          {/* stats */}
          <motion.div variants={stagger} initial="hidden" animate={inV?"visible":"hidden"}
            style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"1.4rem"}}
          >
            {stats.map(s=>(
              <motion.div key={s.l} variants={scaleIn} transition={{duration:.55}}
                whileHover={{scale:1.04,borderColor:"rgba(232,160,32,.35)",background:"#0e0e0e"}}
                style={{border:"1px solid #181818",padding:"1.8rem 1.5rem",borderRadius:"3px",background:"#0a0a0a",transition:"all .3s"}}
              >
                <div className="grad" style={{fontFamily:"'Cormorant Garamond',serif",fontSize:"2.9rem",fontWeight:700,lineHeight:1,marginBottom:".4rem"}}>{s.n}</div>
                <div style={{color:"#555",fontSize:".78rem",letterSpacing:".05em",fontFamily:"'Outfit',sans-serif"}}>{s.l}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

/* ─── SERVICES ─── */
const Services = () => {
  const ref = useRef(null);
  const inV = useInView(ref,{once:true,margin:"-80px"});
  const services=[
    {icon:"🛒",t:"Amazon FBA Management",d:"Full-service Amazon store management including listing optimization, strategic PPC campaigns, inventory control, and ranking strategies that dominate the Buy Box."},
    {icon:"🛍️",t:"Shopify Store Development",d:"Building high-converting Shopify stores with custom themes, optimized product pages, seamless checkout, and post-purchase flows that maximise LTV."},
    {icon:"📢",t:"Facebook & Instagram Ads",d:"Data-driven Meta advertising campaigns with precision audience targeting, creative testing frameworks, and continuous optimization for maximum ROAS."},
    {icon:"🔍",t:"Google Ads & Shopping",d:"Strategic Google Ads management covering Search, Shopping, Performance Max and Display — engineered to capture high-intent buyers at every funnel stage."},
    {icon:"📈",t:"SEO & Content Strategy",d:"Technical SEO audits, deep keyword research, on-page optimization, and long-form content strategies that compound organic traffic and domain authority."},
    {icon:"📧",t:"Email Marketing & CRM",d:"Automated Klaviyo/Mailchimp flows, segmentation strategies, and campaign management that nurture leads, recover carts, and retain customers at scale."},
  ];

  return (
    <section id="services" ref={ref} style={{padding:"8rem 5%",background:"#050505"}}>
      <div style={{maxWidth:1180,margin:"0 auto"}}>
        <SectionHeader num="02" sub="What I Offer" title="Services & Expertise"/>
        <motion.div variants={stagger} initial="hidden" animate={inV?"visible":"hidden"}
          style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:"1.5px",background:"#161616"}}
        >
          {services.map(s=>(
            <motion.div key={s.t} variants={fadeUp} transition={{duration:.6}}
              whileHover={{background:"#0f0f0f",y:-5}}
              style={{padding:"2.4rem 2rem",background:"#080808",transition:"background .3s",position:"relative",overflow:"hidden"}}
            >
              <motion.div whileHover={{scale:1.25,rotate:8}} style={{fontSize:"1.9rem",marginBottom:"1.1rem",display:"inline-block"}}>{s.icon}</motion.div>
              <h3 style={{fontFamily:"'Cormorant Garamond',serif",fontSize:"1.35rem",fontWeight:600,color:"#e8e8e8",marginBottom:".7rem",lineHeight:1.3}}>{s.t}</h3>
              <p style={{color:"#555",fontSize:".85rem",lineHeight:1.85,fontFamily:"'Outfit',sans-serif"}}>{s.d}</p>
              <motion.div initial={{scaleX:0,originX:0}} whileHover={{scaleX:1}}
                style={{height:1,background:"linear-gradient(90deg,#E8A020,#FF6B35)",marginTop:"1.4rem"}}/>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

/* ─── SKILL BAR ─── */
const SkillBar = ({name,pct,inV,delay}) => (
  <div style={{marginBottom:"1.7rem"}}>
    <div style={{display:"flex",justifyContent:"space-between",marginBottom:".45rem"}}>
      <span style={{color:"#c0c0c0",fontSize:".85rem",fontWeight:500,fontFamily:"'Outfit',sans-serif"}}>{name}</span>
      <span style={{color:"#E8A020",fontSize:".78rem",fontFamily:"'Outfit',sans-serif"}}>{pct}%</span>
    </div>
    <div style={{height:2,background:"#181818",borderRadius:2,overflow:"hidden"}}>
      <motion.div initial={{width:0}} animate={inV?{width:`${pct}%`}:{}} transition={{duration:1.3,delay,ease:"easeOut"}}
        style={{height:"100%",background:"linear-gradient(90deg,#E8A020,#FF6B35)",borderRadius:2,boxShadow:"0 0 12px rgba(232,160,32,.4)"}}/>
    </div>
  </div>
);

/* ─── SKILLS ─── */
const Skills = () => {
  const ref = useRef(null);
  const inV = useInView(ref,{once:true,margin:"-100px"});
  const left=[{n:"Amazon PPC & FBA",p:95},{n:"Facebook & Instagram Ads",p:92},{n:"Google Ads & Shopping",p:88},{n:"Shopify Development",p:90},{n:"SEO Optimization",p:85}];
  const right=[{n:"Email Marketing (Klaviyo)",p:91},{n:"Content Strategy",p:82},{n:"Data Analytics",p:87},{n:"Conversion Rate Optimization",p:88},{n:"TikTok & Social Media",p:84}];

  return (
    <section id="skills" ref={ref} style={{padding:"8rem 5%",background:"#070707"}}>
      <div style={{maxWidth:1180,margin:"0 auto"}}>
        <SectionHeader num="03" sub="My Capabilities" title="Skills & Proficiency"/>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"4rem"}}>
          <motion.div variants={slideL} initial="hidden" animate={inV?"visible":"hidden"} transition={tx}>
            {left.map((s,i)=><SkillBar key={s.n} name={s.n} pct={s.p} inV={inV} delay={.2+i*.15}/>)}
          </motion.div>
          <motion.div variants={slideR} initial="hidden" animate={inV?"visible":"hidden"} transition={tx}>
            {right.map((s,i)=><SkillBar key={s.n} name={s.n} pct={s.p} inV={inV} delay={.2+i*.15}/>)}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

/* ─── PROJECTS ─── */
const Projects = () => {
  const ref = useRef(null);
  const inV = useInView(ref,{once:true,margin:"-80px"});
  const [hov,setHov] = useState(null);
  const projects=[
    {id:1,num:"01",t:"Amazon Store Scaling",cat:"E-Commerce / Amazon FBA",res:"300% Sales Increase",d:"Complete store overhaul with A+ content, listing optimization, and strategic PPC campaigns that tripled monthly revenue within 6 months.",tags:["Amazon PPC","Listing Optimization","A+ Content"],col:"#E8A020"},
    {id:2,num:"02",t:"Shopify DTC Launch",cat:"E-Commerce / Shopify",res:"$500K First-Year Revenue",d:"End-to-end Shopify store build and launch for a fashion brand, achieving $500K in revenue in year one through email flows and CRO.",tags:["Shopify","Klaviyo","CRO"],col:"#FF6B35"},
    {id:3,num:"03",t:"Meta Ads Campaign",cat:"Paid Social / Facebook",res:"5× ROAS Achieved",d:"Multi-phase Facebook & Instagram advertising strategy with creative testing framework delivering consistent 5× return on ad spend.",tags:["Facebook Ads","Creative Testing","Retargeting"],col:"#E8A020"},
    {id:4,num:"04",t:"Google Shopping Ads",cat:"PPC / Google Ads",res:"200% ROI Delivered",d:"Performance Max and Shopping campaigns with smart bidding for a home goods brand, doubling advertising ROI in 90 days.",tags:["Google Ads","Shopping","Performance Max"],col:"#FF6B35"},
  ];

  return (
    <section id="projects" ref={ref} style={{padding:"8rem 5%",background:"#050505"}}>
      <div style={{maxWidth:1180,margin:"0 auto"}}>
        <SectionHeader num="04" sub="Case Studies" title="Featured Work"/>
        <div style={{display:"flex",flexDirection:"column",gap:"1.5px",background:"#141414"}}>
          {projects.map((p,i)=>(
            <motion.div key={p.id}
              variants={fadeUp} initial="hidden" animate={inV?"visible":"hidden"} transition={{duration:.6,delay:i*.14}}
              onHoverStart={()=>setHov(p.id)} onHoverEnd={()=>setHov(null)}
              style={{
                display:"grid",gridTemplateColumns:"72px 1fr auto",alignItems:"center",gap:"2rem",
                padding:"2.2rem 2.8rem",background:hov===p.id?"#0d0d0d":"#080808",
                transition:"background .3s",position:"relative",overflow:"hidden",cursor:"default"
              }}
            >
              {/* accent bar */}
              <motion.div animate={{scaleY:hov===p.id?1:0}} style={{position:"absolute",left:0,top:0,bottom:0,width:3,background:`linear-gradient(to bottom,${p.col},${p.col}55)`,transformOrigin:"top"}}/>
              <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:"2.7rem",fontWeight:700,color:"#161616",lineHeight:1}}>{p.num}</div>
              <div>
                <div style={{color:"#444",fontSize:".7rem",letterSpacing:".16em",textTransform:"uppercase",marginBottom:".25rem",fontFamily:"'Outfit',sans-serif"}}>{p.cat}</div>
                <h3 style={{fontFamily:"'Cormorant Garamond',serif",fontSize:"1.75rem",fontWeight:600,color:"#eeeeee",marginBottom:".4rem"}}>{p.t}</h3>
                <motion.p animate={{opacity:hov===p.id?1:0,height:hov===p.id?"auto":0}}
                  style={{color:"#666",fontSize:".85rem",lineHeight:1.75,overflow:"hidden",fontFamily:"'Outfit',sans-serif"}}
                >{p.d}</motion.p>
              </div>
              <div style={{textAlign:"right",flexShrink:0}}>
                <div style={{color:p.col,fontSize:"1.08rem",fontWeight:600,fontFamily:"'Cormorant Garamond',serif",whiteSpace:"nowrap"}}>{p.res}</div>
                <motion.div animate={{opacity:hov===p.id?1:0}} style={{display:"flex",gap:".35rem",marginTop:".5rem",justifyContent:"flex-end",flexWrap:"wrap"}}>
                  {p.tags.map(tag=>(
                    <span key={tag} style={{fontSize:".67rem",color:"#555",border:"1px solid #1f1f1f",padding:".12rem .45rem",borderRadius:"2px",fontFamily:"'Outfit',sans-serif"}}>{tag}</span>
                  ))}
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ─── MARQUEE / TICKER ─── */
const Marquee = () => {
  const items=["Amazon FBA","Shopify","Facebook Ads","Google Ads","SEO","Email Marketing","CRO","TikTok Ads","Content Strategy","Analytics"];
  const doubled=[...items,...items];
  return (
    <div style={{padding:"2rem 0",background:"#0a0a0a",borderTop:"1px solid #111",borderBottom:"1px solid #111",overflow:"hidden"}}>
      <motion.div animate={{x:["0%","-50%"]}} transition={{duration:22,repeat:Infinity,ease:"linear"}}
        style={{display:"flex",gap:"3rem",whiteSpace:"nowrap"}}
      >
        {doubled.map((item,i)=>(
          <span key={i} style={{display:"inline-flex",alignItems:"center",gap:"1.5rem",color: i%4===0?"#E8A020":"#2a2a2a",fontSize:".8rem",letterSpacing:".18em",textTransform:"uppercase",fontFamily:"'Outfit',sans-serif",fontWeight:500}}>
            {item}
            <span style={{color:"#E8A020",fontSize:".5rem"}}>◆</span>
          </span>
        ))}
      </motion.div>
    </div>
  );
};

/* ─── TESTIMONIALS ─── */
const Testimonials = () => {
  const ref = useRef(null);
  const inV = useInView(ref,{once:true,margin:"-80px"});
  const [act,setAct] = useState(0);
  const testi=[
    {q:"Umar completely transformed our Amazon presence. Within 3 months our sales tripled and ACoS dropped significantly. His strategic approach to PPC is unlike anything I've seen before.",name:"Sarah M.",role:"CEO, HomeStyle Brands"},
    {q:"The Shopify store Umar built for us is stunning — and it converts. We hit $100K in our first month. His understanding of customer psychology and CRO is remarkable.",name:"James K.",role:"Founder, TechWear Co."},
    {q:"Our Facebook ROAS went from 1.8× to 5.2× under Umar's management. He's not just an ad manager — he's a true growth strategist who genuinely cares about results.",name:"Layla R.",role:"Marketing Director, FashionForward"},
  ];
  useEffect(()=>{ const t=setInterval(()=>setAct(a=>(a+1)%testi.length),5000); return ()=>clearInterval(t); },[]);

  return (
    <section ref={ref} style={{padding:"8rem 5%",background:"#070707"}}>
      <div style={{maxWidth:820,margin:"0 auto",textAlign:"center"}}>
        <SectionHeader num="05" sub="Client Voices" title="Testimonials"/>
        <AnimatePresence mode="wait">
          <motion.div key={act} initial={{opacity:0,y:35}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-35}} transition={{duration:.55}}>
            <motion.div className="grad" style={{fontFamily:"'Cormorant Garamond',serif",fontSize:"4.5rem",lineHeight:.8,marginBottom:"1.5rem",display:"block"}}>❝</motion.div>
            <p style={{fontFamily:"'Cormorant Garamond',serif",fontSize:"1.45rem",lineHeight:1.75,color:"#c5c5c5",fontStyle:"italic",marginBottom:"2rem"}}>{testi[act].q}</p>
            <div style={{color:"#fafafa",fontWeight:600,marginBottom:".2rem",fontFamily:"'Outfit',sans-serif"}}>{testi[act].name}</div>
            <div style={{color:"#555",fontSize:".82rem",fontFamily:"'Outfit',sans-serif"}}>{testi[act].role}</div>
          </motion.div>
        </AnimatePresence>
        <div style={{display:"flex",justifyContent:"center",gap:".7rem",marginTop:"2.5rem"}}>
          {testi.map((_,i)=>(
            <motion.button key={i} onClick={()=>setAct(i)} whileHover={{scale:1.3}}
              style={{width:i===act?26:8,height:8,borderRadius:4,background:i===act?"#E8A020":"#252525",border:"none",cursor:"pointer",transition:"width .35s, background .35s"}}/>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ─── CONTACT ─── */
const Contact = () => {
  const ref = useRef(null);
  const inV = useInView(ref,{once:true,margin:"-80px"});
  const [form,setForm] = useState({name:"",email:"",budget:"",message:""});
  const [sent,setSent] = useState(false);

  return (
    <section id="contact" ref={ref} style={{padding:"8rem 5%",background:"#050505"}}>
      <div style={{maxWidth:1180,margin:"0 auto"}}>
        <SectionHeader num="06" sub="Let's Connect" title="Start a Project"/>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1.1fr",gap:"5rem",alignItems:"start"}}>

          {/* left */}
          <motion.div variants={slideL} initial="hidden" animate={inV?"visible":"hidden"} transition={{...tx,delay:.2}}>
            <p style={{color:"#777",lineHeight:1.95,fontSize:".97rem",marginBottom:"2.5rem",fontFamily:"'Outfit',sans-serif"}}>
              Ready to scale your e-commerce business or launch a winning digital marketing campaign?
              Let's discuss your goals and build a strategy that delivers real, measurable results.
            </p>
            {[
              {label:"Email",val:"hamzanazik82@gmail.com",href:"mailto:hamzanazik82@gmail.com"},
              {label:"Availability",val:"Open to new projects",href:null},
              {label:"Response",val:"Within 24 Hours",href:null},
            ].map((item,i)=>(
              <motion.div key={item.label} initial={{opacity:0,x:-30}} animate={inV?{opacity:1,x:0}:{}} transition={{delay:.35+i*.14}}
                style={{display:"flex",gap:"1.4rem",alignItems:"flex-start",marginBottom:"1.6rem"}}
              >
                <div style={{width:1,height:38,background:"linear-gradient(to bottom,#E8A020,transparent)",flexShrink:0,marginTop:".15rem"}}/>
                <div>
                  <div style={{color:"#444",fontSize:".68rem",letterSpacing:".16em",textTransform:"uppercase",marginBottom:".18rem",fontFamily:"'Outfit',sans-serif"}}>{item.label}</div>
                  {item.href
                    ? <a href={item.href} style={{color:"#E8A020",textDecoration:"none",fontSize:".9rem",fontFamily:"'Outfit',sans-serif"}}>{item.val}</a>
                    : <div style={{color:"#bbb",fontSize:".9rem",fontFamily:"'Outfit',sans-serif"}}>{item.val}</div>}
                </div>
              </motion.div>
            ))}

            {/* decorative */}
            <motion.div animate={{opacity:[.04,.08,.04]}} transition={{duration:6,repeat:Infinity}}
              style={{marginTop:"3rem",padding:"2rem",border:"1px solid rgba(232,160,32,.15)",borderRadius:"3px",background:"rgba(232,160,32,.02)"}}
            >
              <div className="grad" style={{fontFamily:"'Cormorant Garamond',serif",fontSize:"1.1rem",fontWeight:600,marginBottom:".5rem"}}>Let's build something great.</div>
              <div style={{color:"#444",fontSize:".82rem",fontFamily:"'Outfit',sans-serif",lineHeight:1.7}}>Whether you're starting from scratch or need to scale an existing store — I'm here to make it happen.</div>
            </motion.div>
          </motion.div>

          {/* form */}
          <motion.div variants={slideR} initial="hidden" animate={inV?"visible":"hidden"} transition={{...tx,delay:.2}}>
            {sent ? (
              <motion.div initial={{opacity:0,scale:.9}} animate={{opacity:1,scale:1}}
                style={{textAlign:"center",padding:"4rem 2rem",border:"1px solid rgba(232,160,32,.2)",borderRadius:"3px"}}
              >
                <motion.div animate={{scale:[1,1.2,1]}} transition={{duration:.6}}
                  style={{fontSize:"2.5rem",marginBottom:"1rem"}}
                >✓</motion.div>
                <div className="grad" style={{fontFamily:"'Cormorant Garamond',serif",fontSize:"1.5rem",fontWeight:600,marginBottom:".5rem"}}>Message Sent!</div>
                <p style={{color:"#555",fontFamily:"'Outfit',sans-serif",fontSize:".88rem"}}>I'll get back to you within 24 hours.</p>
              </motion.div>
            ) : (
              <div>
                {[{name:"name",label:"Full Name",type:"text",ph:"John Doe"},{name:"email",label:"Email Address",type:"email",ph:"john@example.com"},{name:"budget",label:"Project Budget",type:"text",ph:"$1,000 – $5,000"}].map((f,i)=>(
                  <motion.div key={f.name} initial={{opacity:0,y:18}} animate={inV?{opacity:1,y:0}:{}} transition={{delay:.3+i*.1}} style={{marginBottom:"1.1rem"}}>
                    <label style={{display:"block",color:"#555",fontSize:".7rem",letterSpacing:".14em",textTransform:"uppercase",marginBottom:".45rem",fontFamily:"'Outfit',sans-serif"}}>{f.label}</label>
                    <input type={f.type} placeholder={f.ph} value={form[f.name]}
                      onChange={e=>setForm(s=>({...s,[f.name]:e.target.value}))}
                      style={{width:"100%",background:"#0a0a0a",border:"1px solid #1c1c1c",color:"#fafafa",padding:".85rem 1.1rem",borderRadius:"2px",fontSize:".88rem",fontFamily:"'Outfit',sans-serif",transition:"border-color .2s"}}/>
                  </motion.div>
                ))}
                <motion.div initial={{opacity:0,y:18}} animate={inV?{opacity:1,y:0}:{}} transition={{delay:.6}} style={{marginBottom:"1.4rem"}}>
                  <label style={{display:"block",color:"#555",fontSize:".7rem",letterSpacing:".14em",textTransform:"uppercase",marginBottom:".45rem",fontFamily:"'Outfit',sans-serif"}}>Message</label>
                  <textarea placeholder="Tell me about your project, goals, and timeline..." rows={5} value={form.message}
                    onChange={e=>setForm(s=>({...s,message:e.target.value}))}
                    style={{width:"100%",background:"#0a0a0a",border:"1px solid #1c1c1c",color:"#fafafa",padding:".85rem 1.1rem",borderRadius:"2px",fontSize:".88rem",resize:"vertical",fontFamily:"'Outfit',sans-serif",transition:"border-color .2s"}}/>
                </motion.div>
                <motion.button
                  whileHover={{scale:1.02,boxShadow:"0 0 35px rgba(232,160,32,.28)"}} whileTap={{scale:.98}}
                  onClick={()=>{ if(form.name&&form.email&&form.message) setSent(true); }}
                  style={{width:"100%",background:"linear-gradient(135deg,#E8A020,#FF6B35)",color:"#070707",padding:"1rem",border:"none",borderRadius:"2px",fontSize:".82rem",fontWeight:700,letterSpacing:".14em",textTransform:"uppercase",cursor:"pointer",fontFamily:"'Outfit',sans-serif"}}
                >Send Message →</motion.button>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

/* ─── FOOTER ─── */
const Footer = () => {
  const ref = useRef(null);
  const inV = useInView(ref,{once:true});
  return (
    <motion.footer ref={ref} initial={{opacity:0}} animate={inV?{opacity:1}:{}} transition={{duration:.8}}
      style={{padding:"2.5rem 5%",borderTop:"1px solid #101010",background:"#070707",display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:"1rem"}}
    >
      <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:"1.3rem",fontWeight:600}}>
        <span className="grad">Umar Hamza</span>
      </div>
      <div style={{color:"#303030",fontSize:".75rem",letterSpacing:".06em",fontFamily:"'Outfit',sans-serif"}}>
        © {new Date().getFullYear()} — E-Commerce & Digital Marketing Specialist
      </div>
      <motion.a href="mailto:hamzanazik82@gmail.com" whileHover={{color:"#E8A020"}}
        style={{color:"#333",fontSize:".78rem",textDecoration:"none",fontFamily:"'Outfit',sans-serif",transition:"color .2s"}}
      >hamzanazik82@gmail.com</motion.a>
    </motion.footer>
  );
};

/* ─── APP ─── */
export default function App() {
  return (
    <div style={{background:"#070707",minHeight:"100vh"}}>
      <GlobalStyles/>
      <ScrollBar/>
      <Navbar/>
      <Hero/>
      <Marquee/>
      <About/>
      <Services/>
      <Skills/>
      <Projects/>
      <Testimonials/>
      <Contact/>
      <Footer/>
    </div>
  );
}
