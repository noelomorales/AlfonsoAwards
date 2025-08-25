const fs = require('fs');
const path = require('path');
const Ajv = require('ajv');
const ajv = new Ajv({allErrors: true});

const biographySchema = {
  type: 'object',
  required: ['id','fullName','birth','service','summary','portrait','sources'],
  properties: {
    id: {type:'string'},
    fullName: {type:'string'},
    alsoKnownAs: {type:'array', items:{type:'string'}},
    birth: {
      type:'object',
      required:['date','place','coordinates'],
      properties:{
        date:{type:'string'},
        place:{type:'string'},
        coordinates:{anyOf:[{type:'array', items:{type:'number'}, minItems:2, maxItems:2},{type:'null'}]}
      }
    },
    death: {
      type:'object',
      required:['date','place'],
      properties:{
        date:{anyOf:[{type:'string'},{type:'null'}]},
        place:{anyOf:[{type:'string'},{type:'null'}]}
      }
    },
    service: {
      type:'object',
      required:['branch','highestRank','conflicts','servicePeriods'],
      properties:{
        branch:{type:'string'},
        highestRank:{type:'string'},
        conflicts:{type:'array', items:{type:'string'}},
        servicePeriods:{
          type:'array',
          items:{
            type:'object',
            required:['from','to','component','notes'],
            properties:{
              from:{type:'string'},
              to:{type:'string'},
              component:{type:'string'},
              notes:{type:'string'}
            }
          }
        }
      }
    },
    summary:{type:'string'},
    portrait:{type:'string'},
    sources:{type:'array'}
  }
};

const timelineSchema = {
  type:'object',
  required:['events'],
  properties:{
    events:{
      type:'array',
      items:{
        type:'object',
        required:['id','date','title','location','tags','sources'],
        properties:{
          id:{type:'string'},
          date:{type:'string'},
          endDate:{anyOf:[{type:'string'},{type:'null'}]},
          title:{type:'string'},
          description:{anyOf:[{type:'string'},{type:'null'}]},
          location:{
            type:'object',
            required:['name','coordinates'],
            properties:{
              name:{anyOf:[{type:'string'},{type:'null'}]},
              coordinates:{anyOf:[{type:'array', items:{type:'number'}, minItems:2, maxItems:2},{type:'null'}]}
            }
          },
          tags:{type:'array', items:{type:'string'}},
          sources:{type:'array'}
        }
      }
    }
  }
};

const photosSchema = {
  type:'object',
  required:['photos'],
  properties:{
    photos:{
      type:'array',
      items:{
        type:'object',
        required:['id','file','title','caption','alt','takenAt','location','tags','credit','sources'],
        properties:{
          id:{type:'string'},
          file:{type:'string'},
          title:{type:'string'},
          caption:{type:'string'},
          alt:{type:'string'},
          takenAt:{anyOf:[{type:'string'},{type:'null'}]},
          location:{
            type:'object',
            required:['name','coordinates'],
            properties:{
              name:{anyOf:[{type:'string'},{type:'null'}]},
              coordinates:{anyOf:[{type:'array', items:{type:'number'}, minItems:2, maxItems:2},{type:'null'}]}
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
