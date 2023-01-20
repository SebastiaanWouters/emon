import React from 'react'
import reactStringReplace from 'react-string-replace'
import {decode} from 'light-bolt11-decoder'

export const MessageContent = ({msg, owner}) => {
    const IMAGE_PROXY = "https://imgproxy-prod-emon-image-proxy-8tbihf.mo2.mogenius.io/imgproxy-og28dq/plain/";
    const linkRegex = /(https?:\/\/\S+)/g
    const lnRegex =
      /(lightning:[\w.-]+@[\w.-]+|lightning:\w+\?amount=\d+|(?:lightning:)?(?:lnurl|lnbc|lntb)[\da-z0-9]+)/gi;

    const imageRegexp = /(https?:\/\/.*\.(?:png|jpg|gif))/i;

    function replaceImages(msg) {
      return (reactStringReplace(msg, imageRegexp, (match, i) => (
          <img key={match + i} src={`${IMAGE_PROXY}${match}`}>
          </img>
        )))
  }


    function replaceLinks(msg) {
        return (reactStringReplace(msg, linkRegex, (match, i) => (
            <a key={match + i} href={match} target="_blank">
              {match.length > 20 ? `${match.slice(0,20)}...` : match}
            </a>
          )))
    }
    function replaceInvoice(msg) {
        if (!owner) {return reactStringReplace(msg, lnRegex, (match, i) => {
            if (!match.startsWith('lightning:')) {
              match = `lightning:${match}`;
            }
            return (<>
                    <a className='lightning' key={match + i} href={match}>⚡ Pay with lightning</a>
                    </>)
          })}
          if (owner) { return reactStringReplace(msg, lnRegex, (match, i) => {
            const invoice = decode(match);
            console.log(invoice);
            return (<>
                    <span className='lightning' key={match + i} >{invoice.sections[2].value/1000} Sats Requested ⚡</span>
                    </>)
          })}
    }


    function replaceAll(msg) {
      const replacedImages = replaceImages(msg);
        const replacedLinks = replaceLinks(replacedImages);
        const replacedInvoices = replaceInvoice(replacedLinks);
        return replacedInvoices;
    }

    return (
        replaceAll(msg)
    )
}
