function TitleCard({ title }) {
  return (
    <div className="bg-slate-900/70 border border-violet-500/20 rounded-3xl p-6">
      <h2 className="text-3xl font-bold">
        {title}
      </h2>
    </div>
  );
}

export default TitleCard;