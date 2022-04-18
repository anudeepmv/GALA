const organization=require('../../models/organization')

class Organizations{

  
    async get(){
        return new Promise(async(resolve,reject)=>{
             organization.find((err, savedCollege) => {
                if (err) {
                    reject('Error while saving user');
                }
                else {
                    resolve(savedCollege);
                }
            });
          
    
        });
    }

    async add(data){
    return new Promise(async(resolve,reject)=>{
     
        let collegeData = new organization(data);
        collegeData.save((err, savedCollege) => {
            if (err) {
                console.log(err)
                reject('Error while saving college');
            }
            else {
                savedCollege = savedCollege.toJSON();
                resolve({
                    message: 'College Successfully Saved' });
            }
        });
      

    });
}

}
module.exports=new Organizations();