package org.colorcoding.ibas.businessone.util;

import org.colorcoding.ibas.bobas.i18n.i18n;

public class Encrypt {

	private static String[] CHARS = new String[] { "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "A", "B", "C", "D",
			"E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y",
			"Z", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t",
			"u", "v", "w", "x", "y", "z" };

	public String random(int length) {
		StringBuilder result = new StringBuilder();
		for (int i = 0; i < length; i++) {
			int seed = (int) Math.floor(Math.random() * CHARS.length);
			result.append(CHARS[seed]);
		}
		return result.toString();
	}

	public String encrypt(String data, String key) throws Exception {
		if (data == null || data.isEmpty()) {
			return data;
		}
		if (key == null || key.isEmpty()) {
			key = this.random(32);
		}
		StringBuilder stringBuilder = new StringBuilder();
		for (char item : key.toCharArray()) {
			stringBuilder.append((int) item);
		}
		int sPos = (int) Math.floor(stringBuilder.length() / 5);
		StringBuilder sBuilder = new StringBuilder();
		sBuilder.append(stringBuilder.charAt(sPos));
		sBuilder.append(stringBuilder.charAt(sPos * 2));
		sBuilder.append(stringBuilder.charAt(sPos * 3));
		sBuilder.append(stringBuilder.charAt(sPos * 4));
		sBuilder.append(stringBuilder.charAt(sPos * 5));
		int mult = Integer.valueOf(sBuilder.toString());
		int incr = (int) Math.ceil(key.length() / 2);
		int modu = (int) (Math.pow(2, 31) - 1);
		if (mult < 2) {
			throw new Exception(i18n.prop("msg_b1_data_must_be_more_longer"));
		}
		long salt = Math.round(Math.random() * 1000000000) % 100000000;
		stringBuilder.append(salt);
		int eKey = Integer.valueOf(stringBuilder.toString());
		while (stringBuilder.length() > 10) {
			eKey = Integer.valueOf(stringBuilder.substring(0, 10))
					+ Integer.valueOf(stringBuilder.substring(10, stringBuilder.length()));
		}
		eKey = (mult * eKey + incr) % modu;
		int enc_chr = 0;
		String enc_str = "";
		for (int i = 0; i < data.length(); i++) {
			enc_chr = data.charAt(i) ^ (int) Math.floor((eKey / modu) * 255);
			if (enc_chr < 16) {
				enc_str += "0" + Integer.toHexString(enc_chr);
			} else
				enc_str += Integer.toHexString(enc_chr);
			eKey = (mult * eKey + incr) % modu;
		}
		String sSalt = Long.toHexString(salt);
		while (sSalt.length() < 8) {
			sSalt = "0" + sSalt;
		}
		enc_str += salt;
		return enc_str;
	}
}
