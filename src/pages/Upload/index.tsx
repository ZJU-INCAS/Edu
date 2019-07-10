import React, { useState } from 'react'
import { navigate } from '@/utils/history'
import styled from 'styled-components'
import muiStyled from '@/muiStyled'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import uploadIcon from '@/assets/upload.png'
import validate from '@/utils/validate'
import rules from './rules'
import { uploadResource } from '@/services/resource'
import {
  Button,
  CircularProgress,
  FormControl,
  // FormHelperText,
  Input,
  InputLabel,
  Typography,
  Select,
  Menu,
  MenuItem,
  TextField,
  FormHelperText
} from '@material-ui/core'


const WrapperDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 500px;
`

const FormDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  width: 350px;
  height: 130px;
`
const Div = styled.div`
  display: flex;
  align-items:center;
  width:320px;
`

const SubmitButton = muiStyled(Button).attrs({
  variant: 'contained',
  color: 'primary',
})({
  marginTop: 35,
  width: 150
})
const UploadButton = muiStyled(Button).attrs({
  variant: 'contained',
  color: 'primary',
})({
  width: 150
})

const ButtonProgress = muiStyled(CircularProgress).attrs({
  size: 20,
  color: 'secondary',
})({
  marginLeft: 15,
})


interface FormField {
  fileTitle: string
  fileContentType: string
  fileDescription: string
  fileInitialProvider: string
  fileKeyWord: string
  fileOwnerShipPrice: number
  fileReadPrice: number
  fileImage: string
}

interface ErrorField {
  fileTitle: string
  fileContentType: string
  fileDescription: string
  fileInitialProvider: string
  fileKeyWord: string
  fileOwnerShipPrice: string
  fileReadPrice: string
  fileImage: string
}

interface SubmitState {
  submitFail: boolean
  loading: boolean
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    formControl: {
      margin: theme.spacing(1),
      width: 320,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  }),
);

const LayoutCenter = styled.div`
  display: flex;
  flex-direction:column;
  width: 100%;
  align-items:center;
  padding-top:20px;
`

export default () => {
  const classes = useStyles();
  const [formField, setFormField] = useState<FormField>({
    fileTitle: '',
    fileContentType: '',
    fileDescription: '',
    fileInitialProvider: '',
    fileKeyWord: '',
    fileOwnerShipPrice: 0,
    fileReadPrice: 0,
    fileImage: ''
  })
  const [errMessage, setErrMessage] = useState<ErrorField>({
    fileTitle: '',
    fileContentType: '',
    fileDescription: '',
    fileInitialProvider: '',
    fileKeyWord: '',
    fileOwnerShipPrice: '',
    fileReadPrice: '',
    fileImage: ''
  })
  const [submitState, setSubmitState] = useState<SubmitState>({
    loading: false,
    submitFail: false,
  })
  const { loading, submitFail } = submitState

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => setFormField({ ...formField, fileContentType: event.target.value })

  const handleCheck = (field: string) => {
    if (field === 'fileTitle') {
      const errInfo = validate({
        descriptor: rules,
        source: {
          fileTitle: formField.fileTitle
        }
      });
      setErrMessage({ ...errMessage, fileTitle: errInfo.errors[0].message.errMsg })
    } else if (field === 'fileInitialProvider') {
      const errInfo = validate({
        descriptor: rules,
        source: {
          fileInitialProvider: formField.fileInitialProvider
        }
      });
      setErrMessage({ ...errMessage, fileInitialProvider: errInfo.errors[1].message.errMsg })
    } else if (field === 'fileKeyWord') {
      const errInfo = validate({
        descriptor: rules,
        source: {
          fileKeyWord: formField.fileKeyWord
        }
      });
      setErrMessage({ ...errMessage, fileKeyWord: errInfo.errors[2].message.errMsg })
    } else if (field === 'fileOwnerShipPrice') {
      const errInfo = validate({
        descriptor: rules,
        source: {
          fileOwnerShipPrice: formField.fileOwnerShipPrice
        }
      });
      setErrMessage({ ...errMessage, fileOwnerShipPrice: errInfo.errors[3].message.errMsg })
    } else if (field === 'fileReadPrice') {
      const errInfo = validate({
        descriptor: rules,
        source: {
          fileReadPrice: formField.fileReadPrice
        }
      });
      setErrMessage({ ...errMessage, fileReadPrice: errInfo.errors[4].message.errMsg })
    } else if (field === 'fileDescription') {
      const errInfo = validate({
        descriptor: rules,
        source: {
          fileDescription: formField.fileDescription
        }
      });
      setErrMessage({ ...errMessage, fileDescription: errInfo.errors[5].message.errMsg })
    }
    else if (field === 'fileImage') {
      const errInfo = validate({
        descriptor: rules,
        source: {
          fileImage: formField.fileImage
        }
      });
      setErrMessage({ ...errMessage, fileImage: errInfo.errors[6].message.errMsg })
    }
  }

  const handleChange = (field: keyof FormField) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormField({
      ...formField,
      [field]: event.target.value,
    })
  }

  const submit = async () => {
    console.log(files)
    if (files) {
      setSubmitState({
        loading: true,
        submitFail: false
      })
      const params = {
        ...formField,
        file: files[0]
      }
      const res: any = await uploadResource(params)
      res.fail(() => setSubmitState({
        loading: false,
        submitFail: false
      })).succeed(() => setSubmitState({
        loading: false,
        submitFail: false
      }))
    } else {
      setErrorTip('请上传文件和图片')
      setSubmitState({
        loading: false,
        submitFail: false
      })
    }
  }

  const [files, setFiles] = useState<Array<any> | null>(null)
  const handleFileChange = (e: any) => {
    setFiles(e.target.files)
  }

  const [images, setImages] = useState<Array<any> | null>(null)
  const handleImageChange = (e: any) => {
    setImages(e.target.files)
  }

  const [errorTip, setErrorTip] = useState('')

  return (
    <LayoutCenter>
      <WrapperDiv>
        <Typography variant="h4">发布图书</Typography>

        <FormDiv>

          <FormControl className={classes.formControl} style={{ marginTop: '60px' }}>
            <InputLabel htmlFor="name">名称</InputLabel>
            <Input onBlur={() => handleCheck('fileTitle')} id="name" value={formField.fileTitle} onChange={handleChange('fileTitle')} />
            <FormHelperText error={true} id="name-simple">{errMessage.fileTitle}</FormHelperText>
          </FormControl>

          <FormControl className={classes.formControl}>
            <InputLabel htmlFor="type-simple">类别</InputLabel>
            <Select
              value={formField.fileContentType}
              onChange={handleSelectChange}
              inputProps={{
                name: 'type',
                id: 'type-simple',
              }}
            >
              <MenuItem value={'人文'}>人文</MenuItem>
              <MenuItem value={'社科'}>社科</MenuItem>
              <MenuItem value={'数学'}>数学</MenuItem>
              <MenuItem value={'外语'}>外语</MenuItem>
              <MenuItem value={'生物'}>生物</MenuItem>
              <MenuItem value={'化学'}>化学</MenuItem>
              <MenuItem value={'法律'}>法律</MenuItem>
              <MenuItem value={'地理'}>地理</MenuItem>
              <MenuItem value={'物理'}>物理</MenuItem>
              <MenuItem value={'环境'}>环境</MenuItem>
              <MenuItem value={'建筑'}>建筑</MenuItem>
              <MenuItem value={'医学'}>医学</MenuItem>
            </Select>
          </FormControl>

          <FormControl className={classes.formControl}>
            <InputLabel htmlFor="fileInitialProvider">提供商</InputLabel>
            <Input onBlur={() => handleCheck('fileInitialProvider')} id="url" value={formField.fileInitialProvider} onChange={handleChange('fileInitialProvider')} />
            <FormHelperText error={true} id="name-simple">{errMessage.fileInitialProvider}</FormHelperText>
          </FormControl>

          <FormControl className={classes.formControl} style={{ marginTop: '60px' }}>
            <InputLabel htmlFor="keyword">关键词</InputLabel>
            <Input onBlur={() => handleCheck('fileKeyWord')} id="keyword" value={formField.fileKeyWord} onChange={handleChange('fileKeyWord')} />
            <FormHelperText error={true} id="keyword-simple">{errMessage.fileKeyWord}</FormHelperText>
          </FormControl>

          <FormControl className={classes.formControl}>
            <TextField
              onBlur={() => handleCheck('fileOwnerShipPrice')}
              label="拥有价格"
              onChange={handleChange('fileOwnerShipPrice')}
              type="number" />
            <FormHelperText error={true} id="name-simple">{errMessage.fileOwnerShipPrice}</FormHelperText>
          </FormControl>

          <FormControl className={classes.formControl}>
            <TextField
              onBlur={() => handleCheck('fileReadPrice')}
              label="阅读价"
              onChange={handleChange('fileReadPrice')}
              type="number" />
            <FormHelperText error={true} id="name-simple">{errMessage.fileReadPrice}</FormHelperText>
          </FormControl>

          <FormControl className={classes.formControl} style={{ marginTop: '60px' }}>
            <InputLabel htmlFor="fileImage">封面</InputLabel>
            <Input onBlur={() => handleCheck('fileImage')} id="fileImage" value={formField.fileImage} onChange={handleChange('fileImage')} />
            <FormHelperText error={true} id="image-simple">{errMessage.fileImage}</FormHelperText>
          </FormControl>

          <FormControl className={classes.formControl}>
            <Div>
              <Typography style={{ color: 'rgba(0,0,0,0.54)' }} variant="body1">上传文件</Typography>
              <input id='upload-file' style={{ display: 'none' }} type="file" onChange={handleFileChange} />
              <label htmlFor='upload-file'><img style={{ width: '30px', marginLeft: '20px' }} src={uploadIcon} /></label>
            </Div>
          </FormControl>

          <FormControl className={classes.formControl}>
            <TextField
              onBlur={() => handleCheck('fileDescription')}
              id="outlined-multiline-flexible"
              label="简介"
              multiline
              rowsMax="10"
              rows="5"
              value={formField.fileDescription}
              onChange={handleChange('fileDescription')}
              margin="normal"
              variant="outlined"
            />
            <FormHelperText error={true} id="name-simple">{errMessage.fileDescription}</FormHelperText>
          </FormControl>

          <SubmitButton disabled={loading} onClick={submit}>
            {submitFail ? '重试' : '发布'}
            {loading && <ButtonProgress />}
          </SubmitButton>
          <FormHelperText error={true} id="name-simple">{errorTip}</FormHelperText>
        </FormDiv>
      </WrapperDiv >
    </LayoutCenter>
  )
}
