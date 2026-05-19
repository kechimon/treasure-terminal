const initial = 100000

const equity = 179415

const profit = equity - initial

const winrate = ((profit / initial) * 100).toFixed(1)

export const performance = {

  equity: `¥${equity.toLocaleString()}`,

  pnl: `${profit >= 0 ? "+" : ""}¥${profit.toLocaleString()}`,

  winrate: `${winrate}%`,

}