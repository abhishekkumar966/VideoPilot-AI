function TranscriptCard({ transcript }) {
return ( <div className="bg-slate-900/70 backdrop-blur-xl border border-slate-800 p-6 rounded-3xl"> <h3 className="text-xl font-semibold mb-4">
📝 Transcript </h3>


  <div className="max-h-[500px] overflow-y-auto text-slate-300">
    {transcript}
  </div>
</div>


);
}

export default TranscriptCard;
