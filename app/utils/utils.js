const days = [
    {'name':'Lun', 'value':0}, 
    {'name':'Mar', 'value':1},
    {'name':'Mie', 'value':2},
    {'name':'Jue', 'value':3},
    {'name':'Vie', 'value':4},
    {'name':'Sáb', 'value':5},
    {'name':'Dom', 'value':6}
]

export const getDayFn = (day) => {
    console.log("LLEGA", day)
    days.forEach(d => {
        if( d.value == day ) {
            console.log("---> ", d.name)
            return d.name
        }
    })
}