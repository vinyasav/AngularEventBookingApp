import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'searchFilter',
})
export class FilterPipe implements PipeTransform {
    transform(items: any[], criteria: any): any {

        return items.filter(item =>{
          
             if((""+(item.title).toLowerCase()).includes(criteria.toLowerCase())){
                return true;
             
           }
           return false;
        });
    }
}