class Produk{
    constructor(_sku,_img,_nama,_kategori,_stok,_harga){
        this.sku=_sku; //SKU-xxxxxx
        this.img=_img;
        this.nama=_nama;
        this.kategori=_kategori;
        this.stok=_stok;
        this.harga=_harga;
    }
}

class EditProduk{
    constructor(_editNama,_editStok,_editHarga){
        this.nama=_editNama;
        this.stok=_editStok;
        this.harga=_editHarga
    }
}

function btnSimpan(){
    let form= document.getElementById("form-produk");
    let sku="SKU-"+(dataProduk.length+1)+"-"+(Math.round(Math.random()*1000000))
    let img=form.elements[0].value;
    let nama=form.elements[1].value;
    let harga=form.elements[2].value;
    let stok=form.elements[3].value;
    let kategori = form.elements[4].value;
    if(img=="" || nama==""|| harga==""|| stok==""|| kategori==null){
        alert("Isi semua Data")
    }
    else{
        dataProduk.push(new Produk(sku,img,nama,kategori,parseInt(stok),parseInt(harga)))
    }
    document.getElementById("table-produk").innerHTML = printProduk(dataProduk)
    form.elements[0].value = "";
    form.elements[1].value = "";
    form.elements[2].value = "";
    form.elements[3].value = "";
    form.elements[4].value = null;
    
    console.log(dataProduk)
    
}

let dataProduk=[
    {
        sku: "SKU-1-162378",
        img: "./bkr.jpg",
        nama : "ayam bakar",
        harga : 20000,
        stok : 24,
        kategori:"makanan"
    },
    {
        sku: "SKU-2-341516",
        img: "./grg.jpg",
        nama : "ayam Goreng",
        harga : 24000,
        stok : 10,
        kategori:"makanan"
    },
    {
        sku: "SKU-3-123456",
        img: "./st.jpg",
        nama : "es teh",
        harga : 5000,
        stok : 14,
        kategori:"minuman"
    }
]
document.getElementById("table-produk").innerHTML = printProduk(dataProduk)

function printProduk(arr,editTabel){
    let print=""
    for (let i=0;i<arr.length;i++){
    if(editTabel==i){
        print += `<tr>
        <td>${arr[i].sku}</td>
        <td><img src="${arr[i].img}"></td>
        <td><input id="edit-nama"type="text" value="${arr[i].nama}"></td>
        <td>${arr[i].kategori}</td>
        <td><input id="edit-stok" type="number" value="${arr[i].stok}"></td>
        <td><input id="edit-harga" type="number" value="${arr[i].harga}"></td>
        <td>
        <button type="button" onclick="btnSave('${i}')">Save</button>
        <button type="button" onclick="btnCancel('${i}')">Cancel</button>
        </td>
        </tr>`  
        
        
    }
    else{
        print += `<tr>
        <td>${arr[i].sku}</td>
        <td><img src="${arr[i].img}"></td>
        <td>${arr[i].nama}</td>
        <td>${arr[i].kategori}</td>
        <td>${arr[i].stok.toLocaleString()}</td>
        <td>Rp${arr[i].harga.toLocaleString()}</td>
        <td>
        <button type="button" onclick="btnEdit('${i}')">edit</button>
        <button type="button" onclick="deleteProduk('${arr[i].sku}')">delete</button>
        </td>
        <td><button type="button" onclick="btnAdd('${arr[i].sku}')" >Add</button></td>
        </tr>`
        }
    }
    return print  
}

const deleteProduk=(sku)=>{
    let i=parseInt(sku.split("-")[1])-1
    if (confirm(`Anda yakin menghapus produk ${dataProduk[i].nama} ?`)){
        dataProduk.splice(i,1)
        document.getElementById("table-produk").innerHTML = printProduk(dataProduk)
    }
    
}

const btnEdit=(i)=>{
    document.getElementById("table-produk").innerHTML=printProduk(dataProduk,i)
    console.log(i)
}

function btnSave(i){
    let editNama = document.getElementById("edit-nama").value;
    let editStok = parseInt(document.getElementById("edit-stok").value);
    let editHarga = parseInt(document.getElementById("edit-harga").value);
    console.log(editNama)
    dataProduk[i].nama= editNama
    dataProduk[i].stok= editStok
    dataProduk[i].harga= editHarga
    document.getElementById("table-produk").innerHTML=printProduk(dataProduk)
}

function btnCancel(i){
    document.getElementById("table-produk").innerHTML = printProduk(dataProduk)
}

function filterNama(filter_nama){
    let arrTampung=[]
    let item = null;
    for(let i=0;i<dataProduk.length;i++){
        if((dataProduk[i].nama.toLowerCase()).includes(filter_nama.toLowerCase())){
            item += i;
            arrTampung.push(dataProduk[i]);
        }
    }
    return printProduk(arrTampung)
}

function filterHarga(min,max){
    let arrTampung=[]
    let item = null;
    for (let i=0;i<dataProduk.length;i++){
        if(parseInt(min)<=dataProduk[i].harga && parseInt(max)>=dataProduk[i].harga){
            item += i;
            arrTampung.push(dataProduk[i]);
        }
    }
    return printProduk(arrTampung);
}

function filterKategori(filter_kategori){
    let arrTampung = []
    let item = null;
    for (let i=0;i<dataProduk.length;i++){
        if(dataProduk[i].kategori==filter_kategori){
            item += i;
            arrTampung.push(dataProduk[i]);
        }
    }
    return printProduk(arrTampung)
}

function btnFilter(){
    let form = document.getElementById("form-filter");
    let filter_nama = form.elements[0].value;
    let min = form.elements[1].value;
    let max = form.elements[2].value;
    let filter_kategori=form.elements[3].value;
    if (filter_nama!="" && min=="" && max==""&& filter_kategori=="all"){
        document.getElementById("table-produk").innerHTML=filterNama(filter_nama)
    }
    else if(filter_nama=="" && min!="" && max!="" && filter_kategori=="all"){
        document.getElementById("table-produk").innerHTML=filterHarga(min,max)

    }
    else if(filter_nama=="" && min=="" && max=="" && filter_kategori != "all"){
        document.getElementById("table-produk").innerHTML=filterKategori(filter_kategori)
    }
    form.elements[0].value = "";
    form.elements[1].value = "";
    form.elements[2].value = "";
    form.elements[3].value = "all";
}

function btnReset(){
    document.getElementById("table-produk").innerHTML = printProduk(dataProduk)

}

function printCart(array,ktt){
    let print = ""
    kett = null
    for (let i=0;i<array.length;i++){
        print += `
        <tr>
        <td>${i+1}</td>
        <td>${array[i].sku}</td>
        <td>${array[i].nama}</td>
        <td>${array[i].kategori}</td>
        <td>${array[i].ktt}</td>
        <td>Rp${array[i].harga.toLocaleString()}</td>
        <td>Rp${((array[i].harga)*array[i].ktt).toLocaleString()}</td>
        <td><button type="button" onclick="btnHapus('${i}')">Hapus</button></td>
        </tr>
        `
    }
    return print
    
}
// ktt = kuantitas pd keranjang
let keranjang=[]
function btnAdd(sku){
    let i=parseInt(sku.split("-")[1])-1
    let kuantitas = parseInt(prompt(`Jumlah yg ingin dibeli dari ${dataProduk[i].nama}`,1))
    if (kuantitas >= 1 && kuantitas <= dataProduk[i].stok){
        dataProduk[i].ktt= kuantitas
        dataProduk[i].stok -= kuantitas
        keranjang.push(dataProduk[i])
        console.log(keranjang)
        document.getElementById("table-keranjang").innerHTML=printCart(keranjang)
        document.getElementById("table-produk").innerHTML=printProduk(dataProduk)
    }else{
        alert("Mohon maaf input tidak sesuai atau melebihi stok ")
    }
}

const btnHapus=(i)=>{
    let idxProduk = parseInt(keranjang[i].sku.split("-")[1]-1)
    dataProduk[idxProduk].stok++
    keranjang[i].ktt--
    if (keranjang[i].ktt==0){
        keranjang.splice(i,1)
    }
    document.getElementById("table-keranjang").innerHTML = printCart(keranjang)
    document.getElementById("table-produk").innerHTML=printProduk(dataProduk)

}
// ar= array
function printBayar(ar){
    let print = ""
    for (let i=0; i<ar.length; i++){
        print += `
        ${i+1} |  ${ar[i].sku} |  ${ar[i].nama} |  ${ar[i].kategori} |  ${ar[i].ktt} |  Rp.${ar[i].harga.toLocaleString()} |  Rp.${((ar[i].harga)*ar[i].ktt).toLocaleString()} <br> `

    }
    return print
}

let total = null
function btnCheckOut() {
    for (let i=0;i<keranjang.length;i++){
        total += keranjang[i].harga*keranjang[i].ktt
        document.getElementById("tampil-subtotal").innerHTML=`Rp. ${total.toLocaleString()}`
    }
    document.getElementById("tampil-transaksi").innerHTML=printBayar(keranjang)
}

function btnBayar(){
    let uang=parseInt(document.getElementById("input-uang").value)
    // console.log(uang)
    if (uang >= total){
        let kembalian = uang-total
        console.log(kembalian)
        keranjang=[]
        total=null
        document.getElementById("tampil-kembalian").innerHTML = `Kembalian Anda Rp.${kembalian.toLocaleString()}`;
        document.getElementById("table-keranjang").innerHTML = printCart(keranjang)
        document.getElementById("tampil-subtotal").innerHTML=total
    }else{
        alert("Uang Anda Tidak Cukup")
    }
}
