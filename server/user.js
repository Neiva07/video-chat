const houses = ["Stark", "Targaryan", "Lannister", "Martell", "Baratheon", "Greyjoy","Arryn"]

const cities = ["Paris", "NewYork", "SanFrancisco", "Rio", "SaoPaulo", "Tokyo", "Madrid", "Vancouver","Sidney","London", "Berlim", "Munique", "Moscow", "Miami", "Lisboa", "Barcelona", "Milan", "Roma", "HongKong", "Beijing", "Shanghai", "Manchester"]


module.exports = () => {
    const house = houses[Math.floor(Math.random() * houses.length)]
    const city = cities[Math.floor(Math.random() * cities.length)]
    const MIN = 1000;
    const MAX = 9999;
    const num = Math.floor(Math.random() * (MAX + 1 - MIN) + MIN)

    return `${house}-${city}-${num}`
}
