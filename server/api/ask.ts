export default defineEventHandler(async (event) => {
    const clothes = [
        "Striped denim jacket",
        "Flowy floral maxi dress",
        "Black leather ankle boots",
        "Plaid flannel shirt",
        "Navy blue cargo pants",
        "Embroidered bohemian blouse",
        "Checked tailored blazer",
        "Knit beanie hat",
        "Printed silk scarf",
        "Distressed skinny jeans",
    ]
    const text = clothes.reduce((prev, val) => `${prev},${val}`, "You have the following clothes: ")
    const config = useRuntimeConfig();
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${config.gptKey}`
        },
        body: JSON.stringify({
            messages: [
                {"role": "system", "content": "You are a helpful fashion coordinator."},
                {"role": "system", "content": text},
                {"role": "system", "content": `Today's weather is ${32} degrees celsius, ${60}% humidity`},
                {"role": "user", "content": "What clothes should I wear today?"}
            ],
            model: "gpt-3.5-turbo",
            max_tokens: 500,
            temperature: 1,
            n: 1,
            stop: '###'
        })
    });
    return await response.json()
    if (response.status !== 200) {
        return response
    }
    return {
        hello: 'world'
    }
})