function ActionItemsCard({ items }) {
return ( <div className="bg-slate-900/70 backdrop-blur-xl border border-slate-800 p-6 rounded-3xl"> <h3 className="font-semibold mb-3">
✅ Action Items </h3>


  <p className="text-slate-300">
    {items}
  </p>
</div>


);
}

export default ActionItemsCard;
