            }
          },
          tags:{type:'array', items:{type:'string'}},
          credit:{type:'string'},
          sources:{type:'array'}
        }
      }
    }
  }
};

const awardsSchema = {
  type:'object',
  required:['awards'],
  properties:{
    awards:{
      type:'array',
      items:{
        type:'object',
        required:['slug','name','description','conflict','devices','whyHeRates','sources'],
        properties:{
          slug:{type:'string'},
          name:{type:'string'},
          description:{type:'string'},
          conflict:{type:'string'},
          devices:{type:'array'},
          whyHeRates:{type:'string'},
          sources:{type:'array'}
        }
      }
    }
  }
};

const documentsSchema = {
  type:'object',
  required:['documents'],
  properties:{
    documents:{
      type:'array',
      items:{
        type:'object',
        required:['id','title','file'],
        properties:{
          id:{type:'string'},
          title:{type:'string'},
          file:{type:'string'}
        }
      }
    }
  }
};

function validateFile(filePath, schema, name) {
  const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  const valid = ajv.validate(schema, data);
  if (valid) {
    console.log(`${name} data valid`);
  } else {
    console.error(`${name} data errors:`, ajv.errors);
    process.exitCode = 1;
  }
}

validateFile(path.join(__dirname, '..', 'data', 'biography.json'), biographySchema, 'Biography');
const timelinePath = path.join(__dirname, '..', 'data', 'timeline.json');
validateFile(timelinePath, timelineSchema, 'Timeline');
const timelineData = JSON.parse(fs.readFileSync(timelinePath, 'utf8'));
const sortedEvents = [...timelineData.events].sort((a, b) =>
  a.date.localeCompare(b.date) || a.title.localeCompare(b.title)
);
if (JSON.stringify(timelineData.events) !== JSON.stringify(sortedEvents)) {
  console.error('Timeline events not sorted');
  process.exitCode = 1;
} else {
  console.log('Timeline events sorted');
}
validateFile(path.join(__dirname, '..', 'data', 'photos.json'), photosSchema, 'Photos');
validateFile(path.join(__dirname, '..', 'data', 'awards.json'), awardsSchema, 'Awards');
validateFile(path.join(__dirname, '..', 'data', 'documents.json'), documentsSchema, 'Documents');