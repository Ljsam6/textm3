
const path = require('path');
const fs = require('fs');
var Filter = require('bad-words'),
    filter = new Filter();
filter.removeWords('hello');
filter.addWords(['kutta']);
 
module.exports = function (formidable, Club, Users,Black,async) {
    return {
        SetRouting: function (router) {
            router.get('/dashboard', this.adminPage);

            router.post('/uploadFile', this.uploadFile);
            router.post('/dashboard', this.adminPostPage);
        },

        adminPage: function (req, res) {
            async.parallel([
                function (callback) {
                    var badwords = [];
                    
                    Black.find({}, (err, result) => {

                        var results = result;
                        //console.log(results);
                        results.forEach((words) => {
                            if (filter.isProfane(words.body)) {
                                badwords.push(words);

                            }
                            //console.log(badwords);
                            
                        });
                        callback(err,badwords);
                    });},

                    


            ],(err,results)=>{
                const res1=results[0];
                const res2=[{userName:'null',body:'null',name:'null',createdAt:'null'}];
                console.log(res1);
                if(!res1){
                    res.render('admin/dashboard',{resultss:res2});
                }

               res.render('admin/dashboard', { resultss:res1 });



            });

           

            
        },

        adminPostPage: function (req, res) {
            const newClub = new Club();
            newClub.class = req.body.class;
            newClub.stream= req.body.stream;
            newClub.image = req.body.upload;
            newClub.save((err) => { //res.render('admin/dashboard');
                   async.parallel([
                    function (callback) {
                        var badwords = [];
                        
                        Black.find({}, (err, result) => {
    
                            var results = result;
                            //console.log(results);
                            results.forEach((words) => {
                                if (filter.isProfane(words.body)) {
                                    badwords.push(words);
    
                                }
                                //console.log(badwords);
                                
                            });
                            callback(err,badwords);
                        });},
    
                        
    
    
                ],(err,results)=>{
                    const res1=results[0];
                    const res2=[{userName:'null',body:'null',name:'null',createdAt:'null'}];
                    console.log(res1);
                    if(!res1){
                        res.render('admin/dashboard',{resultss:res2});
                    }
    
                   res.render('admin/dashboard', { resultss:res1 });
    
    
    
                });
            })
        },

        uploadFile: function (req, res) {
            const form = new formidable.IncomingForm();
            form.uploadDir=path.join(__dirname,'../public/uploads');

            form.on('file', (field, file) => {
                fs.rename(file.path,path.join(form.uploadDir,file.name),(err)=>{
                    if(err) throw err;
                    console.log('file renamed sucessfully');
                });
 
            });

            form.on('error', (err) => {
                console.log('err');
            });

            form.on('end', () => {
                console.log('file upload sufessfull')
            });

            form.parse(req);
        }
    }
}









































