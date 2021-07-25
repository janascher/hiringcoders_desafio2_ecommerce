/*== Show Menu ==*/
const showMenu = (toggleId, navId) =>{
    const toggle = document.getElementById(toggleId),
    nav = document.getElementById(navId)

    if (toggle && nav){
        toggle.addEventListener('click', () =>{
            nav.classList.toggle('show')
        })
    }
}

showMenu('nav-toggle','nav-menu')

/*== Remove Menu ==*/
const navLink = document.querySelectorAll('.nav_link'),
    navMenu = document.getElementById('nav-menu')

function linkAction(){
    navMenu.classList.remove('show')
}
navLink.forEach(n => n.addEventListener('click', linkAction))

/*== Change Color Header ==*/
window.onscroll = () =>{
    const nav = document.getElementById('header')

    if (this.scrollY >= 200) nav.classList.add('scroll-header'); else nav.classList.remove('scroll-header')
}

/*== LocalStorage Newsletter ==*/
const form = document.getElementById('newletter-subscribe');

form.addEventListener('submit', (e) =>{
    e.preventDefault()
    let name = document.getElementById('newletter-input-name').value;
    let email = document.getElementById('newletter-input-email').value;
    let data = {
        name,
        email,
    }

    if (localStorage.getItem('lead') === null){
        localStorage.setItem('lead', JSON.stringify([data]));
    }else{
        localStorage.setItem('lead', JSON.stringify([...JSON.parse(localStorage.getItem('lead')),data]));
    }

    let thanks = "Obrigado! Você receberá o cupom de desconto por e-mail.";
    alert(thanks);
})

/*== LocalStorage Shop ==*/
const cartBtn = document.getElementsByClassName('button_light');
console.log(cartBtn);
let items = [];
for(let i=0; i<cartBtn.length; i++){
    cartBtn[i].addEventListener('click', function(e){
        if(typeof(Storage) !== 'undefined'){
            let item ={
                id:i+1,
                name:e.target.parentElement.children[2].textContent,
                price:e.target.parentElement.children[3].textContent,
                no:1 
            };
            if(JSON.parse(localStorage.getItem('items')) === null){
                items.push(item);
                localStorage.setItem('items', JSON.stringify(items));
                window.location.reload();
            }else{
                const localItems = JSON.parse(localStorage.getItem('items'));
                localItems.map(data =>{
                    if(item.id == data.id){
                        item.no = data.no + 1;
                    }else{
                        items.push(data);
                    }
                });
                items.push(item);
                localStorage.setItem('items', JSON.stringify(items));
                window.location.reload();
            }
        }else{
            console.log('storange está funcionado')
        }
    });
    // Add Data to Shop
    const navShop = document.querySelector('.nav_shop p');
    let no = 0;
    JSON.parse(localStorage.getItem('items')).map(data =>{
        no = no+data.no;
    })
    navShop.innerHTML = no;
}

