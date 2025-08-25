const heads = ["spider","zombie","creeper","villager","enderman","alex"]

export async function profileImage(){ 
  try{
    let random =Math.floor((Math.random()*heads.length));
    console.log("from random : "+random);
    const res = await fetch(`https://mc-heads.net/avatar/${heads[random]}`)
    
    if (!res.ok){
      throw new Error('failed to fetch!');
    } 
    let image = await res.blob()
    return URL.createObjectURL(image);
  }catch(err){
    console.error(err)
  }
}

