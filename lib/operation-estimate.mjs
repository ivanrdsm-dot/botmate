/** Workload inventory, not a robot performance prediction or a labor-replacement estimate. */
export function estimateWorkload(trips, minutes, days, share) {
  const inputs=[trips,minutes,days,share];
  if(inputs.some(x=>!Number.isFinite(x))||trips<0||minutes<0||days<0||days>31||share<0||share>100) return null;
  const totalHours=trips*minutes*days/60;
  return {totalHours,reviewHours:totalHours*share/100};
}
