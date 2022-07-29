import { LightningElement,api } from 'lwc';

export default class Lwc_Paginacao extends LightningElement {
    @api pagesize; 
    @api componentname;

    page = 1; 
    items = []; 
    startingRecord = 1;
    endingRecord = 0; 
    totalRecountCount = 0;
    totalPage = 1;
    data = [];

    @api handleInit(data) {
            this.items = data;
            this.totalRecountCount = data.length; 
            var tp =  Math.ceil(this.totalRecountCount / this.pagesize);
            this.totalPage = (tp == 0)?1:tp; 
            this.page = 1;
            this.data = this.items.slice(0,this.pagesize); 
            this.endingRecord = this.pagesize;
            this.dispatchEvent(new CustomEvent('pagination'+this.componentname, {
                detail: this.data
            }));
    }

    previousHandler() {
        if (this.page > 1) {
            this.page = this.page - 1;
            this.displayRecordPerPage(this.page);
        }
    }

    nextHandler() {
        if((this.page<this.totalPage) && this.page !== this.totalPage){
            this.page = this.page + 1;
            this.displayRecordPerPage(this.page);
        }
    }

    displayRecordPerPage(page){
        this.startingRecord = ((page -1) * this.pagesize) ;
        this.endingRecord = (this.pagesize * page);
        this.endingRecord = (this.endingRecord > this.totalRecountCount)? this.totalRecountCount : this.endingRecord;
        this.data = this.items.slice(this.startingRecord, this.endingRecord);
        this.startingRecord = this.startingRecord + 1;
        this.dispatchEvent(new CustomEvent('pagination'+this.componentname, {
            detail: this.data
        }));
    }
}