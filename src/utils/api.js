const key = "d560k8pr01qu3qo7lhvgd560k8pr01qu3qo7li00";

export const getPrice = async (symbol) => {
    if (!symbol) return null;

    try {
        const url = `https://finnhub.io/api/v1/quote?symbol=${symbol}&token=${key}&_t=${Date.now()}`;
        const res = await fetch(url, { cache: 'no-store' });
        const data = await res.json();

 
        if (!data || typeof data.c === 'undefined' || data.c === 0) {
            return null;
        }

        return {
            price: data.c,
            change: data.dp || 0,
            high: data.h || data.c,
            low: data.l || data.c,
            open: data.o || data.c,
            prev: data.pc || data.c
        };
    } catch (e) {
        console.log("Error fetching price:", e);
        return null;
    }
};

export const getHistory = async (symbol) => {
    const currentData = await getPrice(symbol);
    const basePrice = currentData && currentData.price ? currentData.price : 100;

    let history = [];
    let price = basePrice;

    for (let i = 0; i < 14; i++) {
        history.unshift({
            day: i + 1,
            value: price
        });
        const fluctuate = (Math.random() - 0.5) * 0.04;
        price = price * (1 - fluctuate);
    }

    return history;
};
