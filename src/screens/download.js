let contact = vCard()
 
    //set properties
    contact.firstName = 'Eric';
    contact.middleName = 'J';
    contact.lastName = 'Nesser';
    contact.organization = 'ACME Corporation';
    contact.photo.attachFromUrl('https://avatars2.githubusercontent.com/u/5659221?v=3&s=460', 'JPEG');
    contact.workPhone = '312-555-1212';
    contact.birthday = new Date('01-01-1985');
    contact.title = 'Software Developer';
    contact.url = 'https://github.com/enesser';
    contact.note = 'Notes on Eric';

    console.log(contact);
    
    //save to file
    // const documentPath = rnfs.DocumentDirectoryPath;
    // contact.saveToFile(`${documentPath}/eric-nesser.vcf`);
    // contact.saveToFile('./eric-nesser.vcf');
    
    //get as formatted string
console.log(contact.getFormattedString());