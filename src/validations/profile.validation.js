const Joi = require('joi');

const updateProfile = {
  body: Joi.object()
    .keys({
      id_jns_sdm: Joi.number().optional(),
      photo: Joi.string().optional(),
      jk: Joi.number().optional(),
      tmpt_lahir: Joi.string().optional(),
      tgl_lahir: Joi.date().optional(),
      nm_ibu_kandung: Joi.string().optional(),
      stat_kawin: Joi.number().optional(),
      nik: Joi.string().length(16).optional(), // Assuming NIK is always 16 digits
      nip: Joi.string().optional(),
      jln: Joi.string().optional(),
      rt: Joi.string().optional(),
      rw: Joi.string().optional(),
      ds_kel: Joi.string().optional(),
      id_kec: Joi.string().optional(),
      id_wil: Joi.string().optional(),
      no_tel_rmh: Joi.string().optional(),
      no_hp: Joi.string().optional(),
      sk_angkat: Joi.string().optional(),
      tmt_sk_angkat: Joi.date().optional(),
      npwp: Joi.string().optional(),
      a_braille: Joi.boolean().optional(),
      a_bhs_isyarat: Joi.boolean().optional(),
      id_agama: Joi.number().optional(),
      mampu_handle_kk: Joi.boolean().optional(),
      id_ext: Joi.array()
        .items(
          Joi.object().keys({
            platform: Joi.string().required(), // Validates the platform name
            id: Joi.string().required(), // Validates the corresponding ID
          })
        )
        .optional(),
    })
    .min(1), // Requires at least one field to be updated
};

module.exports = {
  updateProfile,
};
