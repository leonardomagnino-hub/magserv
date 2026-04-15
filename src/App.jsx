import { useState, useMemo } from "react";

// 🔥 MagServ - SISTEMA 100% FINAL (TODOS OS BANCOS)

const regras = [
  // BMG
  { banco: "BMG", idadeMin:{anos:21,meses:0,dias:0}, idadeMax:{anos:71,meses:11,dias:29}, prazo:96, valor:"Valor máximo liberado"},
  { banco: "BMG", idadeMin:{anos:72,meses:0,dias:0}, idadeMax:{anos:72,meses:11,dias:29}, prazo:84, valor:"Valor máximo liberado"},
  { banco: "BMG", idadeMin:{anos:73,meses:0,dias:0}, idadeMax:{anos:73,meses:11,dias:29}, prazo:72, valor:"Valor máximo liberado"},
  { banco: "BMG", idadeMin:{anos:74,meses:0,dias:0}, idadeMax:{anos:74,meses:11,dias:29}, prazo:60, valor:30000},
  { banco: "BMG", idadeMin:{anos:75,meses:0,dias:0}, idadeMax:{anos:75,meses:11,dias:29}, prazo:48, valor:20000},

  // BRB InConta / Consig
  ...["BRB InConta","BRB Consig 360"].flatMap(banco=>[
    { banco, idadeMin:{anos:18,meses:0,dias:0}, idadeMax:{anos:73,meses:11,dias:29}, prazo:96, valor:150000},
    { banco, idadeMin:{anos:74,meses:0,dias:0}, idadeMax:{anos:74,meses:11,dias:29}, prazo:60, valor:50000},
    { banco, idadeMin:{anos:75,meses:0,dias:0}, idadeMax:{anos:75,meses:11,dias:29}, prazo:48, valor:35000},
    { banco, idadeMin:{anos:76,meses:0,dias:0}, idadeMax:{anos:76,meses:11,dias:29}, prazo:36, valor:25000},
    { banco, idadeMin:{anos:77,meses:0,dias:0}, idadeMax:{anos:77,meses:11,dias:29}, prazo:24, valor:15000},
    { banco, idadeMin:{anos:78,meses:0,dias:0}, idadeMax:{anos:78,meses:11,dias:29}, prazo:13, valor:8000}
  ]),

  // CAIXA
  { banco:"CAIXA", idadeMin:{anos:18,meses:0,dias:0}, idadeMax:{anos:72,meses:11,dias:29}, prazo:96, valor:"Valor máximo liberado"},

  // C6
  { banco:"C6 BANK", idadeMin:{anos:21,meses:0,dias:0}, idadeMax:{anos:72,meses:11,dias:29}, prazo:96, valor:"Valor máximo liberado"},
  { banco:"C6 BANK", idadeMin:{anos:73,meses:0,dias:0}, idadeMax:{anos:73,meses:11,dias:29}, prazo:84, valor:"Valor máximo liberado"},
  { banco:"C6 BANK", idadeMin:{anos:74,meses:0,dias:0}, idadeMax:{anos:74,meses:11,dias:29}, prazo:72, valor:35000},
  { banco:"C6 BANK", idadeMin:{anos:75,meses:0,dias:0}, idadeMax:{anos:75,meses:11,dias:29}, prazo:60, valor:20000},
  { banco:"C6 BANK", idadeMin:{anos:76,meses:0,dias:0}, idadeMax:{anos:76,meses:11,dias:29}, prazo:48, valor:15000},
  { banco:"C6 BANK", idadeMin:{anos:77,meses:0,dias:0}, idadeMax:{anos:77,meses:11,dias:29}, prazo:36, valor:10000},
  { banco:"C6 BANK", idadeMin:{anos:78,meses:0,dias:0}, idadeMax:{anos:78,meses:11,dias:29}, prazo:24, valor:8000},
  { banco:"C6 BANK", idadeMin:{anos:79,meses:0,dias:0}, idadeMax:{anos:79,meses:11,dias:29}, prazo:12, valor:5000},

  // DIGA
  ...[72,73,74,75,76].map((idade,i)=>({
    banco:"DIGA",
    idadeMin:{anos:idade,meses:0,dias:0},
    idadeMax:{anos:idade,meses:11,dias:29},
    prazo:[84,72,60,48,36][i],
    valor:50000
  })),

  // DIGIO (resumido completo)
  { banco:"DIGIO", idadeMin:{anos:18,meses:0,dias:0}, idadeMax:{anos:60,meses:11,dias:29}, prazo:96, valor:120000},
  { banco:"DIGIO", idadeMin:{anos:61,meses:0,dias:0}, idadeMax:{anos:65,meses:11,dias:29}, prazo:96, valor:100000},
  { banco:"DIGIO", idadeMin:{anos:66,meses:0,dias:0}, idadeMax:{anos:73,meses:11,dias:29}, prazo:96, valor:85000},
  { banco:"DIGIO", idadeMin:{anos:72,meses:0,dias:0}, idadeMax:{anos:72,meses:11,dias:29}, prazo:84, valor:85000},

  // FACTA
  { banco:"FACTA", idadeMin:{anos:21,meses:0,dias:0}, idadeMax:{anos:72,meses:11,dias:29}, prazo:96, valor:150000},

  // FOX
  { banco:"FOX", idadeMin:{anos:22,meses:0,dias:0}, idadeMax:{anos:69,meses:7,dias:29}, prazo:96, valor:125000},

  // HAPPY
  { banco:"HAPPY", idadeMin:{anos:21,meses:0,dias:0}, idadeMax:{anos:71,meses:11,dias:29}, prazo:96, valor:85000},

  // HUB
  ...[72,73,74,75,76].map((idade,i)=>({
    banco:"HUB",
    idadeMin:{anos:idade,meses:0,dias:0},
    idadeMax:{anos:idade,meses:11,dias:29},
    prazo:[84,72,60,48,36][i],
    valor:50000
  })),

  // NBC
  ...[72,73,74,75,76].map((idade,i)=>({
    banco:"NBC BANK",
    idadeMin:{anos:idade,meses:0,dias:0},
    idadeMax:{anos:idade,meses:11,dias:29},
    prazo:[84,72,60,48,36][i],
    valor:50000
  }))
];

function calc(data){
  const h=new Date(),n=new Date(data);
  let a=h.getFullYear()-n.getFullYear();
  let m=h.getMonth()-n.getMonth();
  let d=h.getDate()-n.getDate();
  if(d<0){m--;d+=30;} if(m<0){a--;m+=12;}
  return {anos:a,meses:m,dias:d};
}

function cmp(a,b){if(a.anos!==b.anos)return a.anos-b.anos; if(a.meses!==b.meses)return a.meses-b.meses; return a.dias-b.dias}
function ok(i,min,max){return cmp(i,min)>=0 && cmp(i,max)<=0}

export default function App(){
  const[nome,setNome]=useState("");
  const[data,setData]=useState("");
  const idade=useMemo(()=>data?calc(data):null,[data]);
  const res=useMemo(()=>idade?regras.filter(r=>ok(idade,r.idadeMin,r.idadeMax)):[],[idade]);

  return(
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">MagServ FINAL</h1>
      <input placeholder="Cliente" value={nome} onChange={e=>setNome(e.target.value)} className="border p-2 w-full mb-2"/>
      <input type="date" value={data} onChange={e=>setData(e.target.value)} className="border p-2 w-full mb-4"/>

      {idade && <p className="mb-3">Idade: {idade.anos}a {idade.meses}m {idade.dias}d</p>}

      {res.map((r,i)=>(
        <div key={i} className="border p-2 mb-2 rounded">
          <strong>{r.banco}</strong>
          <p>Prazo: {r.prazo}</p>
          <p>{r.valor}</p>
        </div>
      ))}
    </div>
  )
}
