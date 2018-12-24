
import { Subject } from 'rxjs'

//--------------------------------------
// producer
//--------------------------------------

const producer = {

    getItem() {
        let item = "ITEM-1";
        return item;
    },
    getItems() {
        let items = {
            [Symbol.iterator]: function () {
                let i = 0;
                return {
                    next: function () {
                        i++;
                        return { value: 'item-' + i, done: i <= 10 ? false : true }
                    }
                }
            }
        };
        return items;

    },
    getItemAsync() {
        let promise = new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve("ITEM_ASYNC");   // async / push single item
            }, 4000)
        });
        return promise;
    },
    getItemsAsync() {
        let stream = new Subject();
        setInterval(() => {
            let n = Math.random() * 100;
            if (n < 20) stream.complete();
            stream.next(n)
        }, 1000)
        return stream;
    }

}


//--------------------------------------



//--------------------------------------
// consumer
//--------------------------------------

const consumer = {
    doSomething() {

        // let item = producer.getItem();  // sync  / pull  for single-itme
        // console.log(item);

        // let items = producer.getItems();
        // for (let item of iems) {          // sync  / pull for multiple items 
        //     console.log(item);
        // }

        // let promise = producer.getItemAsync();
        // promise.then(item => console.log(item))


        let stream = producer.getItemsAsync();
        stream
            .subscribe((item) => { console.log(item); }, null, () => { console.log('thanks for numbers'); })


    }
}
consumer.doSomething()

//--------------------------------------