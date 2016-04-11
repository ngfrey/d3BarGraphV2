# Extra R functions

set.seed(123)
numz<- round(runif(15, min=3, max=20),0) #15 whole numbers between 3 and 20
makeJSON<- function(numz) {
  tst<- noquote(paste(numz, collapse = ","))
  tstjson<- noquote(paste0("[", tst, "];"))
  return(tstjson)
}
makeJSON(numz) #[1] [8,16,10,18,19,4,12,18,12,11,19,11,15,13,5];

