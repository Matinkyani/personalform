// تعریف متغیرها
const form = document.getElementById("userForm");
const nameInput = document.getElementById("name");
const familyInput = document.getElementById("family");
const emailInput = document.getElementById("email");
const jobInput = document.getElementById("job");
const phoneInput = document.getElementById("phone");
const genderSelect = document.getElementById("gender");
const modal = document.getElementById("modal");
const overlay = document.getElementById("overlay");
let people = [];
// تابع کلید ذخیزه کاربران در آرایه
form.addEventListener("submit" , function (e) {
    e.preventDefault()
   
// تعریف آبجکت
    const newperson = {
        name : nameInput.value.trim(),
        family: familyInput.value.trim(),
        email : emailInput.value.trim(),
        job : jobInput.value.trim(),
        phone : phoneInput.value.trim(),
        gender : genderSelect.value
    }
    if (!newperson.name || !newperson.family || !newperson.email) {
        alert("لطفا فیلدهای الزامی را پر کنید❌")
        return
    }
    // ریختن ابجکت در آرایه
    people.push(newperson)
    form.reset();

    console.log(people);
})
// تابع نمایش همه کاربران
document.getElementById("showModal").addEventListener("click",
()=>{
    if (people.length===0) {
        modal.innerHTML = `<h3>هنوز کاربری یافت نشده است</h3>`
    } else {
        modal.innerHTML = `<h3>لیست کاربران:</h3>`;
        const list = document.createElement("ul");
        people.forEach( (person , index) => {
            const {name,family,email,job,phone,gender} = person
            const li = document.createElement("li");
            li.innerHTML = `${index + 1} . ${name} ${family}
            ایمیل : ${email}
            شغل : ${job || '---'}
            تلفن : ${phone || '---'}
            جنسیت : ${gender || '---'}`
            list.appendChild(li)
        })
        modal.appendChild(list);
    }
    visitModal();

}
)
// وقتی روی صفحه بزنیم به حالت اولیه برگردد بعد از نمایش کاربران
overlay.addEventListener("click",()=>{
    modal.style.opacity="0"
    modal.style.visibility="hidden"
    overlay.style.opacity="0"
    overlay.style.visibility="hidden"
})
// تابع پیدا کردن فرد با ایمیل
document.getElementById("foundByEmail").addEventListener("click",()=>{
    const giveEmail = prompt("ایمیل مورد نظر را وارد کنید:");
    // متد فیلتر برای پیدا کردن شرطمون 
    const personal = people.filter((f)=>{return f.email === giveEmail.trim()})
    
    if (personal.length===0) {
        modal.innerHTML = `<h3>هنوز کاربری یافت نشده است</h3>`
    } else {
        modal.innerHTML = `<h3>لیست کاربران:</h3>`;
        const list = document.createElement("ul");
        people.forEach( (em , index) => {
            const {name,family,email,job,phone,gender} = em
            const li = document.createElement("li");
            li.innerHTML = `${index + 1} . ${name} ${family}
            ایمیل : ${email}
            شغل : ${job || '---'}
            تلفن : ${phone || '---'}
            جنسیت : ${gender || '---'}`
            list.appendChild(li)
        })
        modal.appendChild(list);
    }
    visitModal();
})
// تابع کلید آیا همه شاغل هستند؟
document.getElementById("areHaveJob").addEventListener("click",()=>{
    const allHaveJob = people.every(f=>f.job.trim() != "")
    modal.innerHTML = allHaveJob
    ? "<p>بله همه شاغل هستند✅</p>"
    : "<p>خیر همه شاغل نیستند❌</p>";

    visitModal();
})
// تابع کلید آیا همه مرد هستند؟
document.getElementById("haveMan").addEventListener("click",()=>{
    const man = people.some(f=>f.gender==="مذکر👱")
    modal.innerHTML = man
    ? "<p>بله حداقل یک مرد وجود دارد ✅</p>"
    : "<p>خیر مردی وجود ندارد ❌</p>"
    visitModal();
})

const visitModal = ()=>{
    modal.style.opacity="1"
    modal.style.visibility="visible"
    overlay.style.opacity="1"
    overlay.style.visibility="visible"
}